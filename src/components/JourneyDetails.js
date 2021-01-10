import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
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
            <FormControl variant='filled' className='form-control'>
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
                >
                    <MenuItem value='walking'>
                        <em>Walking</em>
                    </MenuItem>
                    <MenuItem value='taxi'>Taxi</MenuItem>
                    <MenuItem value='train'>Train</MenuItem>
                    <MenuItem value='bus'>Bus</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                </Select>
            </FormControl>
            {/* <label>
                Select Travel Mode
                <select
                    name='cars'
                    id='cars'
                    onChange={(event) => {
                        setTravelMode(event.target.value)
                    }}
                >
                    <option value='walking'>walking</option>
                    <option value='taxi'>taxi</option>
                    <option value='train'>train</option>
                    <option value='bus'>bus</option>
                    <option value='other'>other</option>
                </select>
            </label> */}

            <form className='newUserForm'>
                {travelMode === 'taxi' && (
                    <label>
                        Taxi Reg:
                        <input
                            name='taxiReg'
                            type='text'
                            placeholder='Taxi Reg'
                            required
                            value={taxiReg}
                            onChange={(event) => setTaxiReg(event.target.value)}
                        />
                    </label>
                )}
                {travelMode === 'bus' && (
                    <label>
                        Bus Service:
                        <input
                            name='busService'
                            type='text'
                            placeholder='Bus Service'
                            required
                            value={busService}
                            onChange={(event) =>
                                setBusService(event.target.value)
                            }
                        />
                    </label>
                )}

                {travelMode === 'train' && (
                    <label>
                        Train Service:
                        <input
                            name='trainService'
                            type='text'
                            placeholder='Train Service'
                            required
                            value={trainService}
                            onChange={(event) =>
                                setTrainService(event.target.value)
                            }
                        />
                    </label>
                )}
                {travelMode === 'other' && (
                    <label>
                        Other Transport:
                        <input
                            name='other'
                            type='text'
                            placeholder='please give details'
                            required
                            value={other}
                            onChange={(event) => setOther(event.target.value)}
                        />
                    </label>
                )}

                <label>
                    Travel Companion?:
                    <input
                        name='travelCompanion'
                        type='text'
                        placeholder='Travel Companion?'
                        required
                        value={travelCompanion}
                        onChange={(event) =>
                            setTravelCompanion(event.target.value)
                        }
                    />
                </label>
            </form>
        </div>
    )
}

export default JourneyDetails
