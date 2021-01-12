import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    DirectionsService,
    HeatmapLayer,
    DistanceMatrixService,
} from '@react-google-maps/api'
import { React, useRef, useEffect, useState } from 'react'
import { modeNightStyle, modeDayStyle } from './styles/MapNightMode'
import Loading from './Loading'
import { getCrimesByLocation } from '../CrimeApi'
import { getOriginCoord } from '../geocodeApi'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import HeatSwitch from './Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(1),
        background: '#00A99D',
    },
}))

const Map = (props) => {
    const classes = useStyles()
    const [response, setResponse] = useState(null)
    const [centre, setCentre] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [hasError, setError] = useState(false)
    const [messageError, setMessage] = useState('')
    const [route, setRoute] = useState(false)
    const [crimeData, setData] = useState([])
    const [showHeatMap, setShow] = useState(false)
    const [createdRoute, setCreatedRoute] = useState(false)
    const {
        theme,
        saveDetails,
        startedJourney,
        setWatchId,
        watchId,
        setOrigin,
        origin,
        setDestination,
        destination,
        endRoute,
        setDuration,
        setDistance,
        duration,
        distance,
    } = props
    // in order to have control over the origin and destination of the inputs, it is necessary to use them as references
    const getOrigin = useRef('')
    const getDestination = useRef('')

    const [switchState, setSwitchState] = useState({
        checkedB: false,
    })

    const handleSwitchChange = (event) => {
        setSwitchState({
            ...switchState,
            [event.target.name]: event.target.checked,
        })
        onClickHeatMap()
    }

    // asking permission to navigator to set location
    useEffect(() => {
        if (startedJourney) {
            watchLocation()
        } else {
            setLocation()
        }
    }, [startedJourney])

    // set centre and origin with current position
    const setLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCentre({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setOrigin({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setLoading(false)
            })
        } else {
            setError(true)
            setMessage('Your browser needs access to your location')
        }
    }

    const watchLocation = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 60000,
            maximumAge: 0,
        }

        if (navigator.geolocation) {
            setWatchId(
                navigator.geolocation.watchPosition(
                    function (position) {
                        console.log('Latitude is :', position.coords.latitude)
                        console.log('Longitude is :', position.coords.longitude)
                        setCentre({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        })
                    },
                    function (error) {
                        console.log(error)
                    },
                    options
                )
            )
            console.log(watchId, 'watchId')
        }
    }

    // when click the button to create the route, set the origin as the current position if there is nothing in the input, set the destination with the input value
    const onClick = () => {
        if (getOrigin.current.value === '') {
            setOrigin(centre)
            setRoute(false)
            setCreatedRoute(false)
        } else {
            setOrigin(getOrigin.current.value)
            setRoute(false)
            setCreatedRoute(false)
        }
        setDestination(getDestination.current.value)
    }

    // callback function to send a request to the api of google to get the response to render the route
    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setCreatedRoute(true)
                setResponse(response)
            } else {
                console.log(response, 'response directions')
            }
        }
    }

    // callback function to send a request to the api of google to get the duration and the distance of route
    const callbackDistanceService = (response, status) => {
        if (status === 'OK' && response) {
            setDuration(response.rows[0].elements[0].duration.text)
            setDistance(response.rows[0].elements[0].distance.text)
            setRoute(true)
        }
    }

    const onClickHeatMap = () => {
        if (typeof origin === 'string') {
            getOriginCoord(origin).then((response) => {
                getCrimesByLocation(response.lat, response.lng).then(
                    (response) => {
                        const dataCrime = []
                        if (response) {
                            response.forEach((crimeArray) => {
                                let max = 40
                                if (crimeArray.length !== 0) {
                                    if (crimeArray.length < max) {
                                        crimeArray.forEach((element) => {
                                            dataCrime.push(element)
                                        })
                                    } else {
                                        for (let i = 0; i <= max; i++) {
                                            dataCrime.push(crimeArray[i])
                                        }
                                    }
                                }
                            })
                        }
                        setData(dataCrime)
                    }
                )
            })
        } else {
            getCrimesByLocation(origin.lat, origin.lng).then((response) => {
                const dataCrime = []
                if (response) {
                    response.forEach((crimeArray) => {
                        let max = 40
                        if (crimeArray.length !== 0) {
                            if (crimeArray.length < max) {
                                crimeArray.forEach((element) => {
                                    dataCrime.push(element)
                                })
                            } else {
                                for (let i = 0; i <= max; i++) {
                                    dataCrime.push(crimeArray[i])
                                }
                            }
                        }
                    })
                }
                setData(dataCrime)
            })
        }
        if (showHeatMap === true) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    return (
        // the names of these classes are predetermined by the google api, they do not appear in any css file created by us
        <div className='map'>
            {/* display the message */}
            {hasError && (
                <div>
                    <p>{messageError}</p>
                    {/* <button onClick={showMap}>show map</button> */}
                </div>
            )}
            {isLoading ? (
                <Loading />
            ) : (
                <div className='map-container'>
                    {/* component */}
                    <GoogleMap
                        id='direction-example'
                        mapContainerStyle={
                            !startedJourney
                                ? {
                                      height: '150px',
                                      width: '100%',
                                  }
                                : {
                                      height: '100vh',
                                      width: '100%',
                                  }
                        }
                        zoom={startedJourney ? 20 : 13}
                        center={centre}
                        options={
                            theme === 'light'
                                ? { styles: modeDayStyle }
                                : { styles: modeNightStyle }
                        }
                    >
                        {/* the original marker with the centre in the current position*/}
                        <Marker position={centre} />

                        {/* if origin and destination are added, send the request to get the route */}
                        {destination !== '' && origin !== '' && !createdRoute && (
                            <DirectionsService
                                options={{
                                    destination,
                                    origin,
                                    travelMode: 'WALKING',
                                }}
                                callback={directionsCallback}
                            />
                        )}
                        {/* once get the response to the request, render the route in the map*/}
                        {response !== null && !endRoute && (
                            <DirectionsRenderer
                                options={{ directions: response }}
                            />
                        )}

                        {/* render de heatmapping in the map, the coordinates have to be changed with the coordinates from the police api */}
                        {showHeatMap && (
                            <HeatmapLayer
                                data={crimeData.map((location) => {
                                    return new window.google.maps.LatLng(
                                        location.lat,
                                        location.lng
                                    )
                                })}
                            />
                        )}

                        {/* once the destination is defined and the request is not sended yet to the api, send the request */}
                        {destination !== '' && !route && (
                            <DistanceMatrixService
                                options={{
                                    destinations: [destination],
                                    origins: [origin],
                                    travelMode: 'WALKING',
                                }}
                                callback={callbackDistanceService}
                            />
                        )}
                    </GoogleMap>
                </div>
            )}
            {/* form to add the origin and the destination and the button to render the route */}
            {!startedJourney && (
                <div className='map-settings'>
                    {/* <hr className='mt-0 mb-3' /> */}
                    <div className='row'>
                        <div className='col-md-6 col-lg-4'>
                            <div className='form-group'>
                                <form
                                    className={classes.root}
                                    noValidate
                                    autoComplete='off'
                                >
                                    <TextField
                                        id='ORIGIN'
                                        label='Origin'
                                        className='form-control'
                                        variant='outlined'
                                        placeholder='current location'
                                        inputRef={getOrigin}
                                    />
                                </form>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-4'>
                            <div className='form-group'>
                                <form
                                    className={classes.root}
                                    noValidate
                                    autoComplete='off'
                                >
                                    <TextField
                                        id='DESTINATION'
                                        label='Destination'
                                        className='form-control'
                                        variant='outlined'
                                        inputRef={getDestination}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* button to create the route */}
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                        onClick={onClick}
                    >
                        Build Route
                    </Button>

                    {/* when we have the response from the request to the api and we get the duration and the distance, display in a paragraph */}
                    {route && (
                        <p>
                            Duration: {duration}, Distance: {distance}
                        </p>
                    )}
                    {/* button to display crime markers */}
                    <FormGroup className='switchContainer'>
                        <FormControlLabel
                            control={
                                <HeatSwitch
                                    checked={switchState.checkedB}
                                    onChange={handleSwitchChange}
                                    name='checkedB'
                                />
                            }
                            label={
                                showHeatMap
                                    ? 'Hide Hot Spots'
                                    : 'Show Hot Spots'
                            }
                        />
                    </FormGroup>
                </div>
            )}
        </div>
    )
}

export default Map
