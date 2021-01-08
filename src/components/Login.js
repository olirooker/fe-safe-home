import { navigate } from '@reach/router'
import { React, useState, useEffect } from 'react'
import { auth, provider } from '../FirebaseConfig'
import firebase from '../FirebaseConfig.js'
import SignInEmail from './SignInEmail'
import GoogleLogin from './GoogleLogin'
import SignupForm from './SignupForm'

const Login = (props) => {
    //state stuff
    const [showSignup, setShowSignup] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

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
                navigate('/main')
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                setErrorMessage(errorMessage)
                setLoginError(true)
            })
    }

    // google login functionality
    const googleLogin = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                const newUser = result.additionalUserInfo.isNewUser
                const uid = result.user.uid
                const displayName = result.user.displayName
                //use methods on props to change state in App.js
                props.setId(uid)
                props.setLoggedIn(true)
                props.setUsername(displayName)
                props.setIsNewUser(newUser)
                navigate('/main')
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
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
                navigate('/main')
            })
            .catch((error) => {
                const errorCode = error.code
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

            <div className='signupButtonContainer'>
                <button
                    className='toggleSignupButton'
                    onClick={toggleShowSignup}
                >
                    {showSignup ? 'hide signup' : 'show signup'}
                </button>
            </div>

            {showSignup && <SignupForm handleSignUp={handleSignUp} />}
        </div>
    )
}

export default Login
