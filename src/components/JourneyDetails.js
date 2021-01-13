import { React, createRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
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
        setTravelMode,
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
            <p className='whoYouWithTitle'>3. How are you getting home?</p>
            <FormControl
                variant='filled'
                className='form-control'
                style={{ minWidth: 224 }}
            >
                <InputLabel id='demo-simple-select-filled-label'>
                    Select Travel Mode
                </InputLabel>
                <Select
                    labelId='demo-simple-select-filled-label'
                    id='demo-simple-select-filled'
                    onChange={(event) => {
                        setTravelMode(event.target.value)
                    }}
                    className='form-control'
                    defaultValue='walking'
                >
                    <MenuItem value='walking' ref={createRef}>
                        <em>Walking</em>
                    </MenuItem>
                    <MenuItem value='taxi' ref={createRef}>
                        Taxi
                    </MenuItem>
                    <MenuItem value='train' ref={createRef}>
                        Train
                    </MenuItem>
                    <MenuItem value='bus' ref={createRef}>
                        Bus
                    </MenuItem>
                    <MenuItem value='other' ref={createRef}>
                        Other
                    </MenuItem>
                </Select>
            </FormControl>

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
