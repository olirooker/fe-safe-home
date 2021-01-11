import { React, useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const UserContacts = () => {
    // material UI stuff
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }))
    const classes = useStyles()

    // state stuff
    const [showContactsForm, setShowContactsForm] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleShowContactsForm = () => {
        if (showContactsForm) {
            setShowContactsForm(false)
        } else {
            setShowContactsForm(true)
        }
    }
    return (
        <div className='userContactsContainer'>
            <h2>CONTACTS</h2>
            <div>some contacts</div>
            <button onClick={handleShowContactsForm}>
                {showContactsForm ? 'Hide Contacts Form' : 'Show contacts Form'}
            </button>
            {showContactsForm && (
                <div className='userContactsForm'>
                    {'contacts form '}
                    {/* <form
                        className={classes.root}
                        noValidate
                        autoComplete='off'
                    >
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='Person 1'
                            name='personOne'
                            type='text'
                            value={personOne}
                            onChange={(event) =>
                                savePersonOne(event.target.value)
                            }
                            variant='filled'
                        />
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='Person 2'
                            name='personTwo'
                            type='text'
                            value={personTwo}
                            onChange={(event) =>
                                savePersonTwo(event.target.value)
                            }
                            variant='filled'
                        />
                        <TextField
                            className='form-control'
                            id='filled-basic'
                            label='Person 3'
                            name='personThree'
                            type='text'
                            value={personThree}
                            onChange={(event) =>
                                savePersonThree(event.target.value)
                            }
                            variant='filled'
                        />
                    </form> */}
                </div>
            )}
        </div>
    )
}

export default UserContacts
