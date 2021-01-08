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
import getCrimesByLocation from '../CrimeApi'

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
        } else {
            setOrigin(getOrigin.current.value)
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
        }
    }
    const fetchCrimesByLocation = () => {
        getCrimesByLocation().then((response) => {
            console.log(response)
        })
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
                        mapContainerStyle={{
                            height: '150px',
                            width: '100%',
                        }}
                        zoom={13}
                        center={centre}
                        options={
                            props.theme === 'light'
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
                        <HeatmapLayer
                            data={[
                                new window.google.maps.LatLng(37.782, -122.447),
                                new window.google.maps.LatLng(37.782, -122.445),
                                new window.google.maps.LatLng(37.782, -122.443),
                                new window.google.maps.LatLng(37.782, -122.441),
                                new window.google.maps.LatLng(37.782, -122.439),
                                new window.google.maps.LatLng(37.782, -122.437),
                                new window.google.maps.LatLng(37.782, -122.435),
                                new window.google.maps.LatLng(37.785, -122.447),
                                new window.google.maps.LatLng(37.785, -122.445),
                                new window.google.maps.LatLng(37.785, -122.443),
                                new window.google.maps.LatLng(37.785, -122.441),
                                new window.google.maps.LatLng(37.785, -122.439),
                                new window.google.maps.LatLng(37.785, -122.437),
                                new window.google.maps.LatLng(37.785, -122.435),
                            ]}
                        />

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
            </div>
        </div>
    )
}

export default Map
