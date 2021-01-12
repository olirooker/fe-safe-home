import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function SignupForm(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSignUp(username, email, password)
    }
    return (
        <div className='signupFormContainer'>
            <form className={classes.root} noValidate autoComplete='off'>
                <TextField
                    className='form-control'
                    id='filled-basic'
                    label='Username'
                    name='username'
                    type='text'
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
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
                    label='Password'
                    name='password'
                    type='text'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    variant='filled'
                />
            </form>
            <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={handleSubmit}
            >
                Log In
            </Button>
        </div>
    )
}

export default SignupForm
