import React from 'react'
import { LoadScript } from '@react-google-maps/api'
import Map from './Map'
import JourneyDetails from './JourneyDetails'
import { useState } from 'react'

function Main(props) {
    const API_KEY = process.env.REACT_APP_API_KEY

    const [journeyDetails, setDetails] = useState({
        origin: '',
        destination: '',
        currentLocation: '',
        time: '',
        distance: '',
    })

    return (
        <div className='mainContent'>
            <LoadScript
                googleMapsApiKey={API_KEY}
                libraries={['visualization']}
            >
                <Map theme={props.theme} setDetails={setDetails} />
            </LoadScript>
            <div className='journeyContent'>
                <JourneyDetails />
            </div>
        </div>
    )
}

export default Main
