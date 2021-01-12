import React from 'react'
import { FacebookLoginButton } from 'react-social-login-buttons'

function FacebookLogin(props) {
    return (
        <div className='facebookLoginContainer'>
            <FacebookLoginButton
                className='facebookButton'
                onClick={props.facebookLogin}
            >
                <span>Log In with Facebook</span>
            </FacebookLoginButton>
        </div>
    )
}

export default FacebookLogin
