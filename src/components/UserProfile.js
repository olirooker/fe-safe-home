import { React, useState, useEffect, useContext } from 'react'
import { getUserByUid, postNewUser, sendEditUser } from './backendApi'
import Loading from './Loading'
import SetContacts from './UserContacts'
import UserContacts from './UserContacts'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function UserProfile(props) {
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
    // const [firebaseUid, setFirebaseUid] = useState('')
    // const [users, setUsers] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    // const [isNewUser, setIsNewUser] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [streetName, setStreetName] = useState('')
    const [postCode, setPostCode] = useState('')
    const [city, setCity] = useState('')
    const [userData, setUserData] = useState('')
    const [isNewUser, setIsNewUser] = useState(false)
    const [userId, setUserId] = useState('')
    const [showUserEdit, setShowUserEdit] = useState(false)
    const [userEdited, setUserEdited] = useState(false)
    const uid = JSON.parse(localStorage.getItem('userId'))

    // set state
    useEffect(() => {
        // we don't need to change isLoading here
        // console.log(props.userId, 'USER ID IN USER PROFILE')
        // const reloadUserId = JSON.parse(localStorage.getItem('userProfileId'))

        const userId = JSON.parse(localStorage.getItem('userId'))
        const isNewUser = JSON.parse(localStorage.getItem('isNewUser'))
        console.log(userData)
        console.log(showUserEdit, 'show user edit')
        console.log(firstName, 'firstName')

        if (isNewUser) {
            setIsNewUser(true)
            setIsLoading(false)
        } else if (
            !isNewUser &&
            localStorage.getItem.localUser !== 'undefined'
        ) {
            getUserByUid(userId).then((user) => {
                setUserData(user)

                localStorage.setItem('localUser', JSON.stringify(user))
                setIsLoading(false)
            })
        } else if (
            !isNewUser &&
            localStorage.getItem('localUser') === 'undefined'
        ) {
            const userId = JSON.parse(localStorage.getItem('userId'))
            getUserByUid(userId).then((user) => {
                setUserData(user)

                localStorage.setItem('localUser', JSON.stringify(userData))
                setIsLoading(false)
            })
        }
    }, [userEdited, showUserEdit])

    const handleNewUserSubmit = (event) => {
        const userId = JSON.parse(localStorage.getItem('userId'))
        event.preventDefault()
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            phone_number: phoneNumber,
            house_number: +houseNumber,
            street_name: streetName,
            postcode: postCode,
            city: city,
            uid: userId,
        }
        postNewUser(newUser).then((user) => {
            setUserData(user)
            localStorage.setItem('localUser', JSON.stringify(user))
            localStorage.setItem('isNewUser', JSON.stringify(false))
            // also save newUser to localStorage
            props.setIsNewUser(false)
            setIsNewUser(false)
        })
    }
    const handleShowUserEdit = () => {
        setFirstName(userData.user.first_name)
        setLastName(userData.user.last_name)
        setPhoneNumber(userData.user.phone_number)
        setHouseNumber(userData.user.house_number)
        setPostCode(userData.user.postcode)

        setStreetName(userData.user.street_name)
        setCity(userData.user.city)
        setShowUserEdit(true)
    }

    const handleCancelEdit = () => {
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setHouseNumber('')
        setPostCode('')

        setStreetName('')
        setCity('')
        setShowUserEdit(false)
        console.log('CANCELLED!!')
    }
    const handleEditUserSubmit = (event) => {
        event.preventDefault()
        const editUser = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,

            house_number: houseNumber,
            street_name: streetName,
            postcode: postCode,
            city: city,
        }
        sendEditUser(editUser, uid).then((user) => {
            if (user) {
                setFirstName('')
                setLastName('')
                setPhoneNumber('')
                setHouseNumber('')
                setPostCode('')

                setStreetName('')
                setCity('')

                setShowUserEdit(false)
                if (userEdited === true) {
                    setUserEdited(false)
                } else {
                    setUserEdited(true)
                }
            }
        })
    }

    return (
        <div className='userProfileContent'>
            {/* why is this not stuck on load when you are a new user coming to the page for the first time? */}
            {isLoading ? (
                <Loading />
            ) : isNewUser ? (
                <>
                    <h2>New User Profile</h2>
                    <form
                        onSubmit={handleNewUserSubmit}
                        className='newUserForm'
                    >
                        <label>
                            First Name:
                            <input
                                name='firstName'
                                type='text'
                                placeholder='First Name'
                                required
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                name='lastName'
                                type='text'
                                placeholder='Last Name'
                                required
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                            />
                        </label>
                        <label>
                            Username:
                            <input
                                placeholder='Username'
                                required
                                value={userName}
                                onChange={(event) =>
                                    setUserName(event.target.value)
                                }
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                                name='phoneNumber'
                                type='text'
                                placeholder='Phone Number'
                                required
                                value={phoneNumber}
                                onChange={(event) =>
                                    setPhoneNumber(event.target.value)
                                }
                            />
                        </label>
                        <label>
                            House Number:
                            <input
                                name='houseNumber'
                                type='number'
                                placeholder='House Number'
                                required
                                value={houseNumber}
                                onChange={(event) =>
                                    setHouseNumber(event.target.value)
                                }
                            />
                        </label>
                        <label>
                            Street Name:
                            <input
                                name='streetName'
                                type='text'
                                placeholder='Street Name'
                                required
                                value={streetName}
                                onChange={(event) =>
                                    setStreetName(event.target.value)
                                }
                            />
                        </label>
                        <label>
                            Post Code:
                            <input
                                name='postCode'
                                type='text'
                                placeholder='Post Code'
                                required
                                value={postCode}
                                onChange={(event) =>
                                    setPostCode(event.target.value)
                                }
                            />
                        </label>
                        <label>
                            City:
                            <input
                                name='city'
                                type='text'
                                placeholder='City'
                                required
                                value={city}
                                onChange={(event) =>
                                    setCity(event.target.value)
                                }
                            />
                        </label>
                        <button type='submit'>Create Account</button>
                    </form>
                </>
            ) : (
                <>
                    <h2>User Profile</h2>
                    {!userData ? (
                        <Loading />
                    ) : (
                        <div className='profileDetails'>
                            {showUserEdit ? (
                                <>
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
                                            label='Phone Number'
                                            name='phoneNumber'
                                            type='text'
                                            value={phoneNumber}
                                            onChange={(event) =>
                                                setPhoneNumber(
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
                                            name='postCode'
                                            type='text'
                                            value={postCode}
                                            onChange={(event) =>
                                                setPostCode(event.target.value)
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
                                                setCity(event.target.value)
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
                                            onClick={handleEditUserSubmit}
                                        >
                                            Save Contact
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='currentUser'>
                                        <p>
                                            First Name:{' '}
                                            {userData.user.first_name}
                                        </p>
                                        <p>
                                            Last Name: {userData.user.last_name}
                                        </p>
                                        <p>
                                            User Name: {userData.user.username}
                                        </p>
                                        <p>
                                            Phone Number:{' '}
                                            {userData.user.phone_number}
                                        </p>
                                        <p>
                                            House Number:{' '}
                                            {userData.user.house_number}
                                        </p>
                                        <p>
                                            Street Name:{' '}
                                            {userData.user.street_name}
                                        </p>
                                        <p>
                                            Post Code: {userData.user.postcode}
                                        </p>
                                        <p>City: {userData.user.city}</p>
                                    </div>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className={classes.button}
                                        onClick={handleShowUserEdit}
                                    >
                                        Edit Profile
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
            <UserContacts />
        </div>
    )
}

export default UserProfile
