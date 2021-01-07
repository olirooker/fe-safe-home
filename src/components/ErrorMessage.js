import React from 'react'

function ErrorMessage(props) {
    return <div className="errorContent">{`${props.code} ${props.msg}`}</div>
}

export default ErrorMessage
