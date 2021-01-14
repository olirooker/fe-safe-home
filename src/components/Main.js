import { React } from 'react'
import { LoadScript } from '@react-google-maps/api'
import Map from './Map'
import JourneyDetails from './JourneyDetails'
import { getContactsByUid } from './backendApi'
import { useState, useEffect } from 'react'
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
    const [errorMessage, setErrorMessage] = useState('')
    const [errorCode, setErrorCode] = useState('')

    // local storage data
    const userId = JSON.parse(localStorage.getItem('userId'))
    let storageOrigin = JSON.parse(localStorage.getItem('origin'))
    let storageDestination = JSON.parse(localStorage.getItem('destination'))
    let storageStartedJourney = JSON.parse(
        localStorage.getItem('startedJourney')
    )
    let storageDetails = JSON.parse(localStorage.getItem('details'))
    let storageUserLocation = JSON.parse(localStorage.getItem('centre'))
    let storageSavedDetails = JSON.parse(localStorage.getItem('savedDetails'))
    let storageContacts = JSON.parse(localStorage.getItem('contacts'))
    let userDetails = JSON.parse(localStorage.getItem('localUser'))

    const [savedDetails, setSavedDetails] = useState(false)
    const [startedJourney, setStartedJourney] = useState(false)
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [endRoute, setEndRoute] = useState(false)
    const [duration, setDuration] = useState('')
    const [distance, setDistance] = useState('')

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

    // some stuff for the error on loadScript libraries
    // const API_KEY = process.env.REACT_APP_API_KEY
    // const visualization = useLoadScript({
    //     googleMapsApiKey: API_KEY,
    //     libraries: ['visualization'],
    // })

    useEffect(() => {
        if (!apiCalled) {
            fetchAllContacts(userId)
        }
    }, [contacts, apiCalled, userId, destination])

    // email sending function.
    const sendStartEmail = () => {
        init('user_woEvxk93zUEkrcs7jCTzE')
        const selected = storageContacts.filter((contact) => {
            return contact.first_name === storageDetails.selectedContact
        })
        const user = `${userDetails.user.first_name} ${userDetails.user.last_name}`

        let message = ''

        if (storageDetails.travelMode === 'walking') {
            message = `, it should take me ${storageDetails.duration}.`
        } else if (storageDetails.travelMode === 'taxi') {
            message = `. I'm going by taxi and the registration is ${storageDetails.taxiReg}.`
        } else if (storageDetails.travelMode === 'train') {
            message = `. I'm going by train and the information is ${storageDetails.trainService}.`
        } else if (storageDetails.travelMode === 'bus') {
            message = `. I'm going by bus and the number is ${storageDetails.busService}.`
        } else {
            message = `. I'm going by ${storageDetails.other}.`
        }

        const templateParams = {
            from_name: 'safe home',
            to_name: `${selected[0].first_name} ${selected[0].last_name}`,
            message: `${user} is going from ${storageOrigin} to ${storageDestination} ${message} Their current position is ${storageUserLocation}. They're going with ${storageDetails.travelCompanion}. They've been out with ${storageDetails.personOne}, ${storageDetails.personTwo} and ${storageDetails.personThree}`,
            to_email: `${selected[0].email}`,
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
            .catch((err) => {
                setHasError(true)
                setErrorCode(500)
                setErrorMessage('Sorry, please try again later')
            })
    }

    const sendFinishEmail = () => {
        init('user_woEvxk93zUEkrcs7jCTzE')
        const selected = storageContacts.filter((contact) => {
            return contact.first_name === storageDetails.selectedContact
        })

        const user = `${userDetails.user.first_name} ${userDetails.user.last_name}`
        const templateParams = {
            from_name: 'safe home',
            to_name: `${selected[0].first_name} ${selected[0].last_name}`,
            message: `${user} is safely home!`,
            to_email: `${selected[0].email}`,
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
            .catch((err) => {
                setHasError(true)
                setErrorCode(500)
                setErrorMessage('Sorry, please try again later')
            })
    }

    const saveDetailsClick = () => {
        if (savedDetails) {
            setSavedDetails(false)
            localStorage.setItem('savedDetails', JSON.stringify(false))
        } else {
            setSavedDetails(true)
            localStorage.setItem(
                'details',
                JSON.stringify({
                    personOne,
                    personTwo,
                    personThree,
                    travelMode,
                    travelCompanion,
                    selectedContact,
                    taxiReg,
                    busService,
                    trainService,
                    other,
                    distance,
                    duration,
                })
            )
            localStorage.setItem('savedDetails', JSON.stringify(true))
        }
    }
    const startJourneyClick = () => {
        if (storageStartedJourney && storageDetails.selectedContact !== '') {
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
            localStorage.setItem('startedJourney', JSON.stringify(false))
            localStorage.removeItem('destination')
            localStorage.removeItem('responseDirections')
            localStorage.removeItem('details')
            localStorage.removeItem('savedDetails')
            localStorage.removeItem('origin')
        } else if (
            storageDetails.selectedContact !== '' &&
            !storageStartedJourney
        ) {
            sendStartEmail()
            setStartedJourney(true)
            setHasError(false)
            localStorage.setItem('startedJourney', JSON.stringify(true))
        } else {
            setHasError(true)
            setContactErrorMessage('You need to select an emergency contact!')
        }
    }

    const clearWatch = (watchId) => {
        navigator.geolocation.clearWatch(watchId)
    }

    const fetchAllContacts = (id) => {
        getContactsByUid(id)
            .then((response) => {
                setContacts(response.contacts)
                setApiCalled(true)
                localStorage.setItem(
                    'contacts',
                    JSON.stringify(response.contacts)
                )
            })
            .catch((err) => {
                setHasError(true)
                setErrorMessage('This action cannot be done')
                setErrorCode(404)
            })
    }

    return (
        <div className='mainContent'>
            {hasError && <p>{errorMessage}</p>}
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
            {!storageStartedJourney &&
                (storageSavedDetails ? (
                    <div className='savedDetails'>
                        <p>
                            People who you are with: {storageDetails.personOne}{' '}
                            {storageDetails.personTwo &&
                                `, ${storageDetails.personTwo}`}{' '}
                            {storageDetails.personThree &&
                                `and ${storageDetails.personThree}`}
                        </p>
                        <p>
                            Travel companion: {storageDetails.travelCompanion}
                        </p>
                        <p>{`Emergency Contact: ${storageDetails.selectedContact}`}</p>

                        {storageDetails.travelMode === 'walking' ? (
                            <div>
                                <p>
                                    I'm going to walk home and these are my
                                    journey details:
                                </p>
                                <ul>
                                    <li>{`Origin: ${storageOrigin}`}</li>
                                    <li>{`Destination: ${storageDestination}`}</li>
                                    <li>{`Duration: ${storageDetails.duration}`}</li>
                                    <li>{`Distance: ${storageDetails.distance}`}</li>
                                </ul>
                            </div>
                        ) : (
                            <p>
                                I'm going to go home by{' '}
                                {storageDetails.travelMode} and these are the
                                details:
                            </p>
                        )}
                        {storageDetails.travelMode === 'taxi' && (
                            <p>{storageDetails.taxiReg}</p>
                        )}
                        {storageDetails.travelMode === 'bus' && (
                            <p>{storageDetails.busService}</p>
                        )}
                        {storageDetails.travelMode === 'train' && (
                            <p>{storageDetails.trainService}</p>
                        )}
                        {storageDetails.travelMode === 'other' && (
                            <p>{storageDetails.other}</p>
                        )}
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
                {!storageStartedJourney ? 'Start Journey' : 'End Journey'}
            </Button>
        </div>
    )
}

export default Main
