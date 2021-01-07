import React from 'react'

function GoogleLogin(props) {
    return (
        <div className="googleLoginContainer">
            <button className="loginLink" onClick={props.googleLogin}>
                Sign In With Google
            </button>
        </div>
    )
}

export default GoogleLogin
