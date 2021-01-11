import { React, useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {
    postNewContact,
    getContactsByUid,
    deleteContactByContactId,
    sendEditContact,
} from './backendApi'
import Loading from './Loading'

const UserContacts = () => {
    // material UI stuff
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
    const classes = useStyles()

    // state stuff
    const [showContactsForm, setShowContactsForm] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [relationship, setRelationship] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [streetName, setStreetName] = useState('')
    const [postcode, setPostcode] = useState('')
    const [city, setCity] = useState('')
    const [userContacts, setUserContacts] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [contactAdded, setContactAdded] = useState(true)
    const [contactDeleted, setContactDeleted] = useState(true)
    const [contactToBeEdited, setContactToBeEdited] = useState(0)

    const uid = JSON.parse(localStorage.getItem('userId'))

    useEffect(() => {
        getContactsByUid(uid).then((contacts) => {
            setUserContacts(contacts)
            setIsLoading(false)
        })
    }, [contactAdded, contactDeleted])

    const handleShowContactsForm = () => {
        if (showContactsForm) {
            setShowContactsForm(false)
        } else {
            setShowContactsForm(true)
        }
    }

    const handleNewContactSubmit = (event) => {
        event.preventDefault()
        const newContact = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            relationship_user: relationship,
            house_number: houseNumber,
            street_name: streetName,
            postcode: postcode,
            city: city,
        }
        postNewContact(newContact, uid).then((contact) => {
            if (contact) {
                setFirstName('')
                setLastName('')
                setEmail('')
                setHouseNumber('')
                setPostcode('')
                setRelationship('')
                setStreetName('')
                setCity('')
                setShowContactsForm(false)
                if (contactAdded === true) {
                    setContactAdded(false)
                } else {
                    setContactAdded(true)
                }
            }
        })
    }
    const handleShowEdit = (id, contact) => {
        console.log(id, 'ID')
        setFirstName(contact.first_name)
        setLastName(contact.last_name)
        setEmail(contact.email)
        setHouseNumber(contact.house_number)
        setPostcode(contact.postcode)
        setRelationship(contact.relationship_user)
        setStreetName(contact.street_name)
        setCity(contact.city)
        setContactToBeEdited(id)
    }
    const handleCancelEdit = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setHouseNumber('')
        setPostcode('')
        setRelationship('')
        setStreetName('')
        setCity('')
        setContactToBeEdited(0)
    }

    const handleEditContactSubmit = (event) => {
        event.preventDefault()
        const editContact = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            relationship_user: relationship,
            house_number: houseNumber,
            street_name: streetName,
            postcode: postcode,
            city: city,
        }
        sendEditContact(editContact, uid, contactToBeEdited).then((contact) => {
            if (contact) {
                setFirstName('')
                setLastName('')
                setEmail('')
                setHouseNumber('')
                setPostcode('')
                setRelationship('')
                setStreetName('')
                setCity('')
                setContactToBeEdited(0)
                setShowContactsForm(false)
                if (contactAdded === true) {
                    setContactAdded(false)
                } else {
                    setContactAdded(true)
                }
            }
        })
    }

    const handleDeleteContact = (contact_id) => {
        deleteContactByContactId(uid, contact_id).then((response) => {
            if (contactDeleted === true) {
                setContactDeleted(false)
            } else {
                setContactDeleted(true)
            }
        })
    }

    return (
        <div className='userContactsContainer'>
            <h2>CONTACTS</h2>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {' '}
                    {userContacts.contacts.length === 0 ? (
                        <div className='userContacts'>Please add a contact</div>
                    ) : (
                        <>
                            {userContacts.contacts.map((contact) => {
                                if (contactToBeEdited === contact.contact_id) {
                                    return (
                                        <div
                                            className='userContacts'
                                            key={contact.contact_id}
                                        >
                                            <form
                                                className={classes.root}
                                                noValidate
                                                autoComplete='off'
                                            >
                                                <TextField
                                                    className='form-control'
                                                    id='filled-basic'
                                                    label='First Name'
                                                    name='firstName'
                                                    type='text'
                                                    value={firstName}
                                                    onChange={(event) =>
                                                        setFirstName(
                                                            event.target.value
                                                        )
                                                    }
                                                    variant='filled'
                                                />
                                                <TextField
                                                    className='form-control'
                                                    id='filled-basic'
                                                    label='Last Name'
                                                    name='lastName'
                                                    type='text'
                                                    value={lastName}
                                                    onChange={(event) =>
                                                        setLastName(
                                                            event.target.value
                                                        )
                                                    }
                                                    variant='filled'
                                                />
                                                <TextField
                                                    className='form-control'
                                                    id='filled-basic'
                                                    label='Email'
                                                    name='email'
                                                    type='text'
                                                    value={email}
                                                    onChange={(event) =>
                                                        setEmail(
                                                            event.target.value
                                                        )
                                                    }
                                                    variant='filled'
                                                />
                                                <TextField
                                                    className='form-control'
                                                    id='filled-basic'
                                                    label='Relationship'
                                                    name='relationship'
                                                    type='text'
                                                    value={relationship}
                                                    onChange={(event) =>
                                                        setRelationship(
                                                            event.target.value
                                                        )
                                                    }
                                                    variant='filled'
                                                />
                                                <TextField
                                                    className='form-control'
                                                    id='filled-basic'
                                                    label='House Number'
                                                    name='houseNumber'
                                                    type='text'
                                                    value={houseNumber}
                                                    onChange={(event) =>
                                                        setHouseNumber(
                                                            event.target.value
                                                        )
                                                    }
                                                    variant='filled'
                                                />
                                                <TextField
                                                    className='form-control'
                                                    id='filled-basic'
                                                    label='Street Name'
                                                    name='streetName'
                                                    type='text'
                                                    value={streetName}
                                                    onChange={(event) =>
                                                        setStreetName(
                                                            event.target.value
                                                        )
                                                    }
                                                    variant='filled'
                                                />
                                                <TextField
                                                    className='form-control'
                                                    id='filled-basic'
                                                    label='Postcode'
                                                    name='postcode'
                                                    type='text'
                                                    value={postcode}
                                                    onChange={(event) =>
                                                        setPostcode(
                                                            event.target.value
                                                        )
                                                    }
                                                    variant='filled'
                                                />
                                                <TextField
                                                    className='form-control'
                                                    id='filled-basic'
                                                    label='city'
                                                    name='city'
                                                    type='text'
                                                    value={city}
                                                    onChange={(event) =>
                                                        setCity(
                                                            event.target.value
                                                        )
                                                    }
                                                    variant='filled'
                                                />
                                            </form>
                                            <div className='contactButtonsContainer'>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    className={classes.button}
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    className={classes.button}
                                                    onClick={
                                                        handleEditContactSubmit
                                                    }
                                                >
                                                    Save Contact
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div
                                            className='userContacts'
                                            key={contact.contact_id}
                                        >
                                            {' '}
                                            <p>
                                                First Name: {contact.first_name}
                                            </p>
                                            <p>
                                                Last Name: {contact.last_name}
                                            </p>
                                            <p>Email: {contact.email}</p>
                                            <p>
                                                Relatonship:{' '}
                                                {contact.relationship_user}
                                            </p>
                                            <p>
                                                House Number:{' '}
                                                {contact.house_number}
                                            </p>
                                            <p>
                                                Street Name:{' '}
                                                {contact.street_name}
                                            </p>
                                            <p>Post Code: {contact.postcode}</p>
                                            <p>City: {contact.city}</p>
                                            <div className='contactButtonsContainer'>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    className={classes.button}
                                                    onClick={() => {
                                                        handleShowEdit(
                                                            contact.contact_id,
                                                            contact
                                                        )
                                                    }}
                                                >
                                                    Edit Contact
                                                </Button>{' '}
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    className={classes.button}
                                                    onClick={() => {
                                                        handleDeleteContact(
                                                            contact.contact_id
                                                        )
                                                    }}
                                                >
                                                    Delete Contact
                                                </Button>{' '}
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </>
                    )}{' '}
                </>
            )}

            <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={handleShowContactsForm}
            >
                {showContactsForm ? 'Hide Contacts Form' : 'Add Contacts'}
            </Button>
            {showContactsForm && (
                <div className='userContactsForm'>
                    {'Please complete all fields'}
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete='off'
                    >
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='First Name'
                            name='firstName'
                            type='text'
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                            variant='filled'
                        />
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='Last Name'
                            name='lastName'
                            type='text'
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                            variant='filled'
                        />
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='Email'
                            name='email'
                            type='text'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            variant='filled'
                        />
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='Relationship'
                            name='relationship'
                            type='text'
                            value={relationship}
                            onChange={(event) =>
                                setRelationship(event.target.value)
                            }
                            variant='filled'
                        />
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='House Number'
                            name='houseNumber'
                            type='text'
                            value={houseNumber}
                            onChange={(event) =>
                                setHouseNumber(event.target.value)
                            }
                            variant='filled'
                        />
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='Street Name'
                            name='streetName'
                            type='text'
                            value={streetName}
                            onChange={(event) =>
                                setStreetName(event.target.value)
                            }
                            variant='filled'
                        />
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='Postcode'
                            name='postcode'
                            type='text'
                            value={postcode}
                            onChange={(event) =>
                                setPostcode(event.target.value)
                            }
                            variant='filled'
                        />
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='city'
                            name='city'
                            type='text'
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            variant='filled'
                        />
                    </form>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        onClick={handleNewContactSubmit}
                    >
                        Save Contact
                    </Button>
                </div>
            )}
        </div>
    )
}

export default UserContacts
