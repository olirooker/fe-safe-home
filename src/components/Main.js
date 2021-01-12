import { React } from 'react'
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

    const userId = JSON.parse(localStorage.getItem('userId'))

    const [savedDetails, setSavedDetails] = useState(false)
    const [startedJourney, setStartedJourney] = useState(false)
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [endRoute, setEndRoute] = useState(false)
    const [duration, setDuration] = useState('')
    const [distance, setDistance] = useState('')
    const [userLocation, setUserLocation] = useState('')

    // details from journey details component
    const [travelMode, setTravelMode] = useState('walking')
    const [taxiReg, setTaxiReg] = useState('')
    const [busService, setBusService] = useState('')
    const [trainService, setTrainService] = useState('')
    const [travelCompanion, setTravelCompanion] = useState('')
    const [other, setOther] = useState('')

    // contact selected from selectContact component
    const [selectedContact, setSelectedContact] = useState('')
    const [contacts, setContacts] = useState([])
    const [contactErrorMessage, setContactErrorMessage] = useState('')
    const [hasError, setHasError] = useState(false)

    // details from whoYouWith component
    const [personOne, setPersonOne] = useState('')
    const [personTwo, setPersonTwo] = useState('')
    const [personThree, setPersonThree] = useState('')
    const classes = useStyles()
    const [watchId, setWatchId] = useState('')

    const [apiCalled, setApiCalled] = useState(false)

    // component did mount to monitor changing journey details. triggers on new route
    useEffect(() => {
        if (!apiCalled) {
            fetchAllContacts(userId)
        }
    }, [apiCalled, userId])

    // sets the state to the required details
    const getAddress = () => {
        if (typeof origin !== 'string') {
            getAddressFromCoord(origin).then((response) => {
                setOrigin(response)
            })
            // getAddressFromCoord(userLocation).then((response) => {
            //     setUserLocation(response)
            // })
        }
    }

    // email sending function.
    const sendStartEmail = () => {
        init('user_woEvxk93zUEkrcs7jCTzE')
        const selected = contacts.filter((contact) => {
            return contact.first_name === selectedContact
        })

        let message = ''

        if (travelMode === 'walking') {
            message = `, it should take me ${duration}.`
        } else if (travelMode === 'taxi') {
            message = `. I'm going by taxi and the registration is ${taxiReg}.`
        } else if (travelMode === 'train') {
            message = `. I'm going by train and the information is ${trainService}.`
        } else if (travelMode === 'bus') {
            message = `. I'm going by bus and the number is ${busService}.`
        } else {
            message = `. I'm going by ${other}.`
        }

        const templateParams = {
            from_name: 'safe home test',
            to_name: `${selected[0].first_name} ${selected[0].last_name}`,
            message: `I'm going from ${origin} to ${destination} ${message} My current position is ${userLocation}. I'm going with ${travelCompanion}. I've been with ${personOne}, ${personTwo} and ${personThree}`,
            to_email: 'albmatcar@gmail.com',
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

    const sendFinishEmail = () => {
        init('user_woEvxk93zUEkrcs7jCTzE')
        // console.log(contacts, 'contacts')
        const selected = contacts.filter((contact) => {
            return contact.first_name === selectedContact
        })

        console.log(selected.email)

        const templateParams = {
            from_name: 'safe home test',
            to_name: `${selected[0].first_name} ${selected[0].last_name}`,
            message: "I'm safe home!",
            to_email: 'albmatcar@gmail.com',
        }

        emailjs
            .send('default_service', 'template_u667pzk', templateParams)
            .then(
                function (response) {
                    console.log('FINISH EMAIL!', response.status, response.text)
                },
                function (error) {
                    console.log('FAILED...', error)
                }
            )
    }

    const saveDetailsClick = () => {
        getAddress()
        if (savedDetails) {
            setSavedDetails(false)
        } else {
            setSavedDetails(true)
        }
    }
    const startJourneyClick = () => {
        if (startedJourney && selectedContact !== '') {
            setStartedJourney(false)
            clearWatch(watchId)
            sendFinishEmail()
            setSavedDetails(false)
            setPersonOne('')
            setPersonTwo('')
            setPersonThree('')
            setTravelMode('walking')
            setTravelCompanion('')
            setSelectedContact('')
            setOrigin('')
            setDestination('')
            setDuration('')
            setDistance('')
            setEndRoute(true)
        } else if (selectedContact !== '' && !startedJourney) {
            sendStartEmail()
            setStartedJourney(true)
            setHasError(false)
        } else {
            setHasError(true)
            setContactErrorMessage('You need to select an emergency contact!')
        }
    }

    const clearWatch = (watchId) => {
        navigator.geolocation.clearWatch(watchId)
    }

    const fetchAllContacts = (id) => {
        getContactsByUid(id).then((response) => {
            setContacts(response.contacts)
            setApiCalled(true)
        })
    }

    let storageOrigin = JSON.parse(localStorage.getItem('origin'))
    let storageDestination = JSON.parse(localStorage.getItem('destination'))

    console.log(storageOrigin, 'origin')
    console.log(storageDestination, 'destination')

    return (
        <div className='mainContent'>
            <LoadScript
                googleMapsApiKey={API_KEY}
                libraries={['visualization']}
            >
                <Map
                    theme={props.theme}
                    startedJourney={startedJourney}
                    setWatchId={setWatchId}
                    watchId={watchId}
                    setOrigin={setOrigin}
                    origin={origin}
                    setDestination={setDestination}
                    destination={destination}
                    endRoute={endRoute}
                    setDuration={setDuration}
                    setDistance={setDistance}
                    duration={duration}
                    distance={distance}
                />
            </LoadScript>
            {!startedJourney &&
                (savedDetails ? (
                    <div className='savedDetails'>
                        <p>
                            People who you are with: {personOne}{' '}
                            {personTwo && `, ${personTwo}`}{' '}
                            {personThree && `and ${personThree}`}
                        </p>
                        <p>Travel companion: {travelCompanion}</p>
                        {travelMode === 'walking' ? (
                            <div>
                                <p>
                                    I'm going to walk home and these are my
                                    journey details:
                                </p>
                                <ul>
                                    <li>{`Origin: ${origin}`}</li>
                                    <li>{`Destination: ${destination}`}</li>
                                    <li>{`Duration: ${duration}`}</li>
                                    <li>{`Distance: ${distance}`}</li>
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
                            savePersonTwo={setPersonTwo}
                            savePersonThree={setPersonThree}
                            personOne={personOne}
                            personTwo={personTwo}
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

            {hasError && <p>{contactErrorMessage}</p>}

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
