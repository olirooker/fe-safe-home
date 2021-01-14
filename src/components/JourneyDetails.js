import { React, createRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

function JourneyDetails(props) {
    const classes = useStyles()
    const {
        travelMode,
        setTaxiReg,
        taxiReg,
        setBusService,
        busService,
        setTrainService,
        trainService,
        setTravelCompanion,
        travelCompanion,
        setOther,
        other,
    } = props

    return (
        <div className='journeyContent'>
            <p className='whoYouWithTitle'>3. Extra info:</p>
            <div className='newUserForm'>
                {travelMode === 'taxi' && (
                    <div className='form-group'>
                        <form
                            className={classes.root}
                            noValidate
                            autoComplete='off'
                        >
                            <TextField
                                id='taxiReg'
                                label='Taxi Reg'
                                className='form-control'
                                variant='outlined'
                                name='taxiReg'
                                type='text'
                                placeholder='Taxi Reg'
                                required
                                value={taxiReg}
                                onChange={(event) =>
                                    setTaxiReg(event.target.value)
                                }
                            />
                        </form>
                    </div>
                )}
                {travelMode === 'bus' && (
                    <div className='form-group'>
                        <form
                            className={classes.root}
                            noValidate
                            autoComplete='off'
                        >
                            <TextField
                                id='busService'
                                label='Bus service'
                                className='form-control'
                                variant='outlined'
                                name='busService'
                                type='text'
                                placeholder='Bus Service'
                                required
                                value={busService}
                                onChange={(event) =>
                                    setBusService(event.target.value)
                                }
                            />
                        </form>
                    </div>
                )}

                {travelMode === 'train' && (
                    <div className='form-group'>
                        <form
                            className={classes.root}
                            noValidate
                            autoComplete='off'
                        >
                            <TextField
                                id='trainService'
                                label='Train service'
                                className='form-control'
                                variant='outlined'
                                name='trainService'
                                type='text'
                                placeholder='Train Service'
                                required
                                value={trainService}
                                onChange={(event) =>
                                    setTrainService(event.target.value)
                                }
                            />
                        </form>
                    </div>
                )}
                {travelMode === 'other' && (
                    <div className='form-group'>
                        <form
                            className={classes.root}
                            noValidate
                            autoComplete='off'
                        >
                            <TextField
                                id='other'
                                label='Other'
                                className='form-control'
                                variant='outlined'
                                name='other'
                                type='text'
                                placeholder='please give details'
                                required
                                value={other}
                                onChange={(event) =>
                                    setOther(event.target.value)
                                }
                            />
                        </form>
                    </div>
                )}
                <div className='form-group'>
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete='off'
                    >
                        <TextField
                            id='travelCompanion'
                            label='Travel companion ?'
                            className='form-control'
                            variant='outlined'
                            name='travelCompanion'
                            type='text'
                            placeholder='Travel Companion?'
                            value={travelCompanion}
                            onChange={(event) =>
                                setTravelCompanion(event.target.value)
                            }
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JourneyDetails
