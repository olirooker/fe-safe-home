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
import { getAddressFromCoord, getOriginCoord } from '../geocodeApi'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import HeatSwitch from './Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RouteWarning from './RouteWarning'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
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
    const [errorMessage, setErrorMessage] = useState('')
    const [route, setRoute] = useState(false)
    const [crimeData, setData] = useState([])
    const [showHeatMap, setShow] = useState(false)
    const [createdRoute, setCreatedRoute] = useState(false)
    const [directionResponse, setDirectionResponse] = useState('')
    const {
        theme,
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
    let localSavedDetails = JSON.parse(localStorage.getItem('savedDetails'))
    // in order to have control over the origin and destination of the inputs, it is necessary to use them as references
    const getOrigin = useRef('')
    const getDestination = useRef('')

    let storageStartedJourney = JSON.parse(
        localStorage.getItem('startedJourney')
    )

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
    }, [storageStartedJourney])

    // set centre and origin with current position
    const setLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCentre({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                    setOrigin({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                    setLoading(false)
                },
                (error) => {
                    console.log(error)
                },
                { timeout: 10000, enableHighAccuracy: false }
            )
        } else {
            setError(true)
            setErrorMessage('Your browser needs access to your location')
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
        } else {
            setErrorMessage('The GPS is having trouble accessing your location')
            setError(true)
        }
    }

    // when click the button to create the route, set the origin as the current position if there is nothing in the input, set the destination with the input value
    const onClick = () => {
        if (getOrigin.current.value === '') {
            setOrigin(centre)
            setRoute(false)
            setCreatedRoute(false)
            getAddressFromCoord(centre)
                .then((response) => {
                    console.log(response, 'address response')
                    localStorage.setItem('origin', JSON.stringify(response))
                    localStorage.setItem('centre', JSON.stringify(response))
                })
                .catch((error) => {
                    setError(true)
                    setErrorMessage(error.errorMessage)
                })
        } else {
            setOrigin(getOrigin.current.value)
            setRoute(false)
            setCreatedRoute(false)
            localStorage.setItem(
                'origin',
                JSON.stringify(getOrigin.current.value)
            )
        }
        setDestination(getDestination.current.value)

        localStorage.setItem(
            'destination',
            JSON.stringify(getDestination.current.value)
        )
    }

    // callback function to send a request to the api of google to get the response to render the route
    const directionsCallback = (response) => {
        if (response !== null && response.status === 'OK') {
            setCreatedRoute(true)
            setResponse(response)
            localStorage.setItem('responseDirections', JSON.stringify(response))

            setDirectionResponse(response)
        } else {
            setErrorMessage('Please type a valid address')
            setError(true)
        }
    }

    // callback function to send a request to the api of google to get the duration and the distance of route
    const callbackDistanceService = (response) => {
        if (
            (response !== null && response.originAddresses[0] !== '') ||
            response.destinationAddresses[0] !== ''
        ) {
            setDuration(response.rows[0].elements[0].duration.text)
            setDistance(response.rows[0].elements[0].distance.text)
            setRoute(true)
        } else {
            setError(true)
            setErrorMessage('Please type a valid address')
        }
    }

    const onClickHeatMap = () => {
        if (typeof origin === 'string') {
            getOriginCoord(origin)
                .then((response) => {
                    getCrimesByLocation(response.lat, response.lng)
                        .then((response) => {
                            const dataCrime = []
                            if (response) {
                                response.forEach((crimeArray) => {
                                    let max = 50
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
                        .catch((error) => {
                            setErrorMessage(error.message)
                            setError(true)
                        })
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                    setError(true)
                })
        } else {
            getCrimesByLocation(origin.lat, origin.lng)
                .then((response) => {
                    const dataCrime = []
                    if (response) {
                        response.forEach((crimeArray) => {
                            let max = 50
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
                .catch((error) => {
                    setErrorMessage(error.message)
                    setError(true)
                })
        }
        if (showHeatMap === true) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    let storageResponse = {
        response: JSON.parse(localStorage.getItem('responseDirections')),
    }

    return (
        // the names of these classes are predetermined by the google api, they do not appear in any css file created by us
        <div className='map'>
            {/* display the message */}

            {hasError && <p>{errorMessage}</p>}

            {isLoading ? (
                <Loading />
            ) : (
                <div className='map-container'>
                    {/* component */}
                    <GoogleMap
                        id='direction-example'
                        mapContainerStyle={
                            !storageStartedJourney
                                ? {
                                      height: '200px',
                                      width: '100%',
                                  }
                                : {
                                      height: '100vh',
                                      width: '100%',
                                  }
                        }
                        zoom={storageStartedJourney ? 20 : 15}
                        center={centre}
                        options={
                            theme === 'light'
                                ? {
                                      styles: modeDayStyle,
                                      streetViewControl: false,
                                      mapTypeControl: false,
                                      zoomControl: false,
                                  }
                                : {
                                      styles: modeNightStyle,
                                      streetViewControl: false,
                                      mapTypeControl: false,
                                      zoomControl: false,
                                  }
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
                        {storageResponse !== null && !endRoute && (
                            <DirectionsRenderer
                                options={{
                                    directions: storageResponse.response,
                                }}
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
                                radius={10000}
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
                    <RouteWarning
                        directionResponse={directionResponse}
                        crimeData={crimeData}
                    />
                </div>
            )}
            {/* form to add the origin and the destination and the button to render the route */}
            {!storageStartedJourney && !localSavedDetails && (
                <div className='map-settings'>
                    <p className='whoYouWithTitle'>
                        1. Create the route back home
                    </p>
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
                                    <p className='info'>
                                        It takes your current position by
                                        default.
                                    </p>
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
