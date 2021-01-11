import React from 'react'
import { LoadScript } from '@react-google-maps/api'
import Map from './Map'
import JourneyDetails from './JourneyDetails'
import { getContactsByUid } from './backendApi'
import { useState, useEffect } from 'react'
import { getAddressFromCoord } from '../geocodeApi'
import WhoYouWith from './WhoYouWith'
import SelectContact from './SelectContact'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { init } from 'emailjs-com'
import emailjs from 'emailjs-com'

function Main(props) {
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
    const [contacts, setContacts] = useState([])

    // details from whoYouWith component
    const [personOne, setPersonOne] = useState('')
    const [personTwo, setPersonTwo] = useState('')
    const [personThree, setPersonThree] = useState('')
    const classes = useStyles()
    const [watchId, setWatchId] = useState('')

    const [apiCalled, setApiCalled] = useState(false)

    // component did mount to monitor changing journey details. triggers on new route
    useEffect(() => {
        setUserId(props.userId)
        if (!apiCalled) {
            fetchAllContacts()
        }
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

    // email sending function.
    const sendStartEmail = () => {
        init('user_woEvxk93zUEkrcs7jCTzE')
        // console.log(contacts, 'contacts')
        const selected = contacts.filter((contact) => {
            return contact.first_name === selectedContact
        })

        const templateParams = {
            from_name: 'safe home test',
            to_name: `${selected.first_name} ${selected.last_name}`,
            message: `I'm going from ${journeyDetails.origin} to ${journeyDetails.destination}, it should take me ${journeyDetails.duration}. My current position is ${journeyDetails.userLocation}`,
            to_email: `${selected.email}`,
        }

        emailjs
            .send('default_service', 'template_u667pzk', templateParams)
            .then(
                function (response) {
                    console.log('SUCCESS!', response.status, response.text)
                },
                function (error) {
                    console.log('FAILED...', error)
                }
            )
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
            clearWatch(watchId)
        } else {
            sendStartEmail()
            setStartedJourney(true)
        }
    }

    const clearWatch = (watchId) => {
        // for (let i = 0; i < watchId; i++) {
        navigator.geolocation.clearWatch(watchId)
        // }
    }

    // uid is hard coded
    const fetchAllContacts = () => {
        getContactsByUid('ouq2Vs5hq4afIZiEBV0wIUb8Fk03').then((response) => {
            setContacts(response.contacts)
            setApiCalled(true)
        })
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
                    setWatchId={setWatchId}
                    watchId={watchId}
                />
            </LoadScript>
            {!startedJourney &&
                (savedDetails ? (
                    <div className='savedDetails'>
                        <p>
                            People who you are with: {personOne} {personTwo}{' '}
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
                                            if (detail !== 'userLocation') {
                                                return (
                                                    <li>
                                                        {`${detail}: ${journeyDetails[detail]}`}
                                                    </li>
                                                )
                                            }
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
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            onClick={saveDetailsClick}
                        >
                            Edit Details
                        </Button>
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
                            contacts={contacts}
                            setContacts={setContacts}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            onClick={saveDetailsClick}
                        >
                            Save Details
                        </Button>
                    </div>
                ))}

            <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={startJourneyClick}
            >
                {!startedJourney ? 'Start Journey' : 'End Journey'}
            </Button>
        </div>
    )
}

export default Main
