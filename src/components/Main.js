import React from 'react'
import { LoadScript } from '@react-google-maps/api'
import Map from './Map'
import JourneyDetails from './JourneyDetails'
import { useState, useEffect } from 'react'
import { getAddressFromCoord } from '../geocodeApi'
import WhoYouWith from './WhoYouWith'
import SelectContact from './SelectContact'

function Main(props) {
    const API_KEY = process.env.REACT_APP_API_KEY

    const [journeyDetails, setDetails] = useState({})
    const [userId, setUserId] = useState('')

    // component did mount to monitor changing journey details. triggers on new route
    useEffect(() => {
        console.log(journeyDetails, 'journeyDetails')
        setUserId(props.userId)
    }, [journeyDetails])

    // sets the state to the required details
    const saveDetails = (origin, destination, duration, distance, centre) => {
        if (typeof origin !== 'string') {
            getAddressFromCoord(origin).then((response) => {
                setDetails({
                    origin: response,
                    destination,
                    duration,
                    distance,
                    userLocation: centre,
                })
            })
        } else {
            setDetails({
                origin,
                destination,
                duration,
                distance,
                userLocation: centre,
            })
        }
    }

    return (
        <div className='mainContent'>
            <LoadScript
                googleMapsApiKey={API_KEY}
                libraries={['visualization']}
            >
                <Map theme={props.theme} saveDetails={saveDetails} />
            </LoadScript>
            <div className='messageContent'>
                <WhoYouWith />
                <JourneyDetails journeyDetails={journeyDetails} />
                <SelectContact userId={props.userId} />
            </div>
        </div>
    )
}

export default Main
