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
    const [savedDetails, setSavedDetails] = useState(false)
    const [startedJourney, setStartedJourney] = useState(false)

    // details from journey details component
    const [travelMode, setTravelMode] = useState('walking')
    const [taxiReg, setTaxiReg] = useState('')
    const [busService, setBusService] = useState('')
    const [trainService, setTrainService] = useState('')
    const [travelCompanion, setTravelCompanion] = useState('')
    const [other, setOther] = useState('')

    // contact selected from selectContact component
    const [selectedContact, setSelectedContact] = useState({})

    // details from whoYouWith component
    const [personOne, setPersonOne] = useState('')
    const [personTwo, setPersonTwo] = useState('')
    const [personThree, setPersonThree] = useState('')

    // component did mount to monitor changing journey details. triggers on new route
    useEffect(() => {
        setUserId(props.userId)
    }, [])

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

    const saveDetailsClick = () => {
        if (savedDetails) {
            setSavedDetails(false)
        } else {
            setSavedDetails(true)
        }
    }
    const startJourneyClick = () => {
        if (startedJourney) {
            setStartedJourney(false)
        } else {
            setStartedJourney(true)
        }
    }

    return (
        <div className='mainContent'>
            <LoadScript
                googleMapsApiKey={API_KEY}
                libraries={['visualization']}
            >
                <Map
                    theme={props.theme}
                    saveDetails={saveDetails}
                    startedJourney={startedJourney}
                />
            </LoadScript>
            {!startedJourney &&
                (savedDetails ? (
                    <div className='savedDetails'>
                        <p>
                            People who you are with: {personOne} {personTwo}
                            {personThree}
                        </p>
                        <p>Travel companion: {travelCompanion}</p>
                        {travelMode === 'walking' ? (
                            <div>
                                <p>
                                    I'm going to walk home and these are my
                                    journey details:
                                </p>
                                <ul>
                                    {Object.keys(journeyDetails).map(
                                        (detail) => {
                                            return (
                                                <li>
                                                    {`${detail}: ${journeyDetails[detail]}`}
                                                </li>
                                            )
                                        }
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <p>
                                I'm going to go home by {travelMode} and these
                                are the details:
                            </p>
                        )}
                        {travelMode === 'taxi' && <p>{taxiReg}</p>}
                        {travelMode === 'bus' && <p>{busService}</p>}
                        {travelMode === 'train' && <p>{trainService}</p>}
                        {travelMode === 'other' && <p>{other}</p>}
                        <button
                            className='startJourneyButton'
                            onClick={saveDetailsClick}
                        >
                            Edit
                        </button>
                    </div>
                ) : (
                    <div className='messageContent'>
                        <WhoYouWith
                            savePersonOne={setPersonOne}
                            personOne={personOne}
                            savePersonTwo={setPersonTwo}
                            personTwo={personTwo}
                            savePersonThree={setPersonThree}
                            personThree={personThree}
                        />
                        <JourneyDetails
                            setTravelMode={setTravelMode}
                            travelMode={travelMode}
                            setTaxiReg={setTaxiReg}
                            taxiReg={taxiReg}
                            setBusService={setBusService}
                            busService={busService}
                            setTrainService={setTrainService}
                            trainService={trainService}
                            setTravelCompanion={setTravelCompanion}
                            travelCompanion={travelCompanion}
                            setOther={setOther}
                            other={other}
                        />
                        <SelectContact
                            userId={props.userId}
                            saveContact={setSelectedContact}
                        />
                        <button
                            className='startJourneyButton'
                            onClick={saveDetailsClick}
                        >
                            Save Details
                        </button>
                    </div>
                ))}

            <button className='startJourneyButton' onClick={startJourneyClick}>
                {!startedJourney ? 'Start Journey' : 'End Journey'}
            </button>
        </div>
    )
}

export default Main
