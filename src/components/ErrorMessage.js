import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { navigate } from '@reach/router'

import Button from '@material-ui/core/Button'
function ErrorMessage(props) {
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

    const handleClick = (event) => {
        event.preventDefault()
        navigate('/main')
    }

    const classes = useStyles()
    return (
        <div className='errorContent'>
            <h2>{`${props.code} ${props.msg}`}</h2>
            <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={handleClick}
            >
                Go Back
            </Button>
        </div>
    )
}

export default ErrorMessage
