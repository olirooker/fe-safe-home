import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    DirectionsService,
    HeatmapLayer,
    DistanceMatrixService,
} from '@react-google-maps/api'
import { useRef, useEffect, useState } from 'react'
import { modeNightStyle, modeDayStyle } from './styles/MapNightMode'
import Loading from './Loading'
import { getCrimesByLocation } from '../CrimeApi'
import { getOriginCoord } from '../geocodeApi'

const Map = (props) => {
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [response, setResponse] = useState(null)
    const [centre, setCentre] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [hasError, setError] = useState(false)
    const [messageError, setMessage] = useState('')
    const [duration, setDuration] = useState('')
    const [distance, setDistance] = useState('')
    const [route, setRoute] = useState(false)
    const [crimeData, setData] = useState([])
    const [showHeatMap, setShow] = useState(false)
    const { theme, saveDetails, startedJourney } = props
    // in order to have control over the origin and destination of the inputs, it is necessary to use them as references
    const getOrigin = useRef('')
    const getDestination = useRef('')

    // asking permission to navigator to set location
    useEffect(() => {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
                setLocation()
            } else {
                setError(true)
                setMessage('Your browser needs access to your location')
            }
        })
    }, [])

    // set centre and origin with current position
    const setLocation = () => {
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
    }

    // when click the button to create the route, set the origin as the current position if there is nothing in the input, set the destination with the input value
    const onClick = () => {
        if (getOrigin.current.value === '') {
            setOrigin(centre)
            setRoute(false)
        } else {
            setOrigin(getOrigin.current.value)
            setRoute(false)
        }
        setDestination(getDestination.current.value)
    }

    // callback function to send a request to the api of google to get the response to render the route
    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response)
            } else {
                console.log(response, 'response')
            }
        }
    }

    // callback function to send a request to the api of google to get the duration and the distance of route
    const callbackDistanceService = (response, status) => {
        if (status === 'OK' && response) {
            setDuration(response.rows[0].elements[0].duration.text)
            setDistance(response.rows[0].elements[0].distance.text)
            setRoute(true)
            saveDetails(origin, destination, duration, distance, centre)
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
            {hasError && <p>{messageError}</p>}
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
                        zoom={startedJourney ? 50 : 13}
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
                        {destination !== '' && origin !== '' && (
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
                        {response !== null && (
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
                    <hr className='mt-0 mb-3' />

                    <div className='row'>
                        <div className='col-md-6 col-lg-4'>
                            <div className='form-group'>
                                <label htmlFor='ORIGIN'>Origin</label>
                                <br />
                                <input
                                    id='ORIGIN'
                                    className='form-control'
                                    type='text'
                                    ref={getOrigin}
                                    placeholder='current location'
                                />
                            </div>
                        </div>

                        <div className='col-md-6 col-lg-4'>
                            <div className='form-group'>
                                <label htmlFor='DESTINATION'>Destination</label>
                                <br />
                                <input
                                    id='DESTINATION'
                                    className='form-control'
                                    type='text'
                                    ref={getDestination}
                                />
                            </div>
                        </div>
                    </div>
                    {/* button to create the route */}
                    <button
                        className='btn btn-primary'
                        type='button'
                        onClick={onClick}
                    >
                        Build Route
                    </button>

                    {/* when we have the response from the request to the api and we get the duration and the distance, display in a paragraph */}
                    {route && (
                        <p>
                            Duration: {duration}, Distance: {distance}
                        </p>
                    )}
                    {/* button to display crime markers */}
                    <button
                        className='btn btn-primary'
                        type='button'
                        onClick={onClickHeatMap}
                    >
                        {showHeatMap ? 'Hide Hot Spots' : 'Show Hot Spots'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default Map
