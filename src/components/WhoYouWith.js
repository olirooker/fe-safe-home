import { React } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}))

function WhoYouWith(props) {
    const {
        savePersonOne,
        savePersonTwo,
        savePersonThree,
        personOne,
        personTwo,
        personThree,
    } = props

    const classes = useStyles()

    return (
        <div className='whoYouWithContent'>
            <p className='whoYouWithTitle'>Who You With? </p>
            <div className='whoYouWithForm'>
                <form className={classes.root} noValidate autoComplete='off'>
                    <TextField
                        className='form-control'
                        id='person 1'
                        label='Person 1'
                        name='personOne'
                        type='text'
                        value={personOne}
                        onChange={(event) => savePersonOne(event.target.value)}
                        variant='filled'
                    />
                    <TextField
                        className='form-control'
                        id='person 2'
                        label='Person 2'
                        name='personTwo'
                        type='text'
                        value={personTwo}
                        onChange={(event) => savePersonTwo(event.target.value)}
                        variant='filled'
                    />
                    <TextField
                        className='form-control'
                        id='person 3'
                        label='Person 3'
                        name='personThree'
                        type='text'
                        value={personThree}
                        onChange={(event) =>
                            savePersonThree(event.target.value)
                        }
                        variant='filled'
                    />
                </form>
            </div>
        </div>
    )
}

export default WhoYouWith
