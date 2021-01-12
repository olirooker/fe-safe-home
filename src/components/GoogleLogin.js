import React from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons'

function GoogleLogin(props) {
    return (
        <div className='googleLoginContainer'>
            <GoogleLoginButton
                className='googleButton'
                onClick={props.googleLogin}
            >
                <span>Log In with Google</span>
            </GoogleLoginButton>
        </div>
    )
}

export default GoogleLogin
