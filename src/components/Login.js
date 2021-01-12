import { navigate } from '@reach/router'
import { React, useState, useEffect } from 'react'
import { auth, google, facebook } from '../FirebaseConfig'
import firebase from '../FirebaseConfig.js'
import SignInEmail from './SignInEmail'
import GoogleLogin from './GoogleLogin'
import SignupForm from './SignupForm'
import FacebookLogin from './FacebookLogin'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'

const Login = (props) => {
    //state stuff
    const [showSignup, setShowSignup] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

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

    useEffect(() => {}, [])
    // sign in with email method
    const signInEmail = (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                const uid = result.user.uid
                const displayName = result.user.displayName
                const newUser = result.additionalUserInfo.isNewUser
                //use methods on props to change state in App.js
                props.setIsNewUser(newUser)
                props.setId(uid)
                props.setLoggedIn(true)
                props.setUsername(displayName)
                localStorage.setItem('isNewUser', JSON.stringify(newUser))
                localStorage.setItem('userId', JSON.stringify(uid))
                if (newUser) {
                    navigate('/user-profile')
                } else {
                    navigate('/main')
                }
            })
            .catch((error) => {
                // Handle Errors here.

                const errorMessage = error.message
                setErrorMessage(errorMessage)
                setLoginError(true)
            })
    }

    // google login functionality
    const googleLogin = () => {
        auth.signInWithPopup(google)
            .then((result) => {
                const newUser = result.additionalUserInfo.isNewUser
                const uid = result.user.uid
                const displayName = result.user.displayName
                //use methods on props to change state in App.js
                props.setId(uid)
                props.setLoggedIn(true)
                props.setUsername(displayName)
                props.setIsNewUser(newUser)
                localStorage.setItem('isNewUser', JSON.stringify(newUser))
                localStorage.setItem('userId', JSON.stringify(uid))
                if (newUser) {
                    navigate('/user-profile')
                } else {
                    navigate('/main')
                }
            })
            .catch((error) => {
                // Handle Errors here.

                const errorMessage = error.message
                setErrorMessage(errorMessage)
                setLoginError(true)
            })
    }
    // google login functionality
    const facebookLogin = () => {
        console.log('clicked')
        auth.signInWithPopup(facebook)
            .then((result) => {
                const newUser = result.additionalUserInfo.isNewUser
                const uid = result.user.uid
                const displayName = result.user.displayName
                console.log(result)
                //use methods on props to change state in App.js
                props.setId(uid)
                props.setLoggedIn(true)
                props.setUsername(displayName)
                props.setIsNewUser(newUser)
                localStorage.setItem('isNewUser', JSON.stringify(newUser))
                localStorage.setItem('userId', JSON.stringify(uid))
                if (newUser) {
                    navigate('/user-profile')
                } else {
                    navigate('/main')
                }
            })
            .catch((error) => {
                // Handle Errors here.

                const errorMessage = error.message
                setErrorMessage(errorMessage)
                setLoginError(true)
            })
    }

    //toggle show signup button
    const toggleShowSignup = () => {
        if (showSignup) {
            setShowSignup(false)
        } else {
            setShowSignup(true)
        }
    }
    // sign up login method
    const handleSignUp = (username, email, password) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user)
                const { uid } = firebase.auth().currentUser
                const userInfo = firebase.auth().currentUser
                const newUser = user.additionalUserInfo.isNewUser
                userInfo.updateProfile({
                    displayName: username,
                })
                props.setId(uid)
                props.setLoggedIn(true)
                props.setUsername(username)
                props.setIsNewUser(newUser)
                localStorage.setItem('isNewUser', JSON.stringify(newUser))
                localStorage.setItem('userId', JSON.stringify(uid))
                if (newUser) {
                    navigate('/user-profile')
                } else {
                    navigate('/main')
                }
            })
            .catch((error) => {
                const errorMessage = error.message
                setErrorMessage(errorMessage)
                setLoginError(true)
            })
    }

    return (
        <div className='loginPage'>
            <h2 className='loginpageTitle'>LOGIN PAGE</h2>

            {loginError && <div className='loginError'>{errorMessage}</div>}

            <SignInEmail signInEmail={signInEmail} />

            <GoogleLogin googleLogin={googleLogin} />

            <FacebookLogin facebookLogin={facebookLogin} />

            <div className='signupButtonContainer'>
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={toggleShowSignup}
                >
                    {showSignup ? 'hide signup' : 'show signup'}
                </Button>
            </div>

            {showSignup && <SignupForm handleSignUp={handleSignUp} />}
        </div>
    )
}

export default Login
