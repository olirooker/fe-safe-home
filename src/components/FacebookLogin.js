import React from 'react'

function FacebookLogin(props) {
    return (
        <div className='facebookLoginContainer'>
            <button className='loginLink' onClick={props.facebookLogin}>
                Sign In With Facebook
            </button>
        </div>
    )
}

export default FacebookLogin
