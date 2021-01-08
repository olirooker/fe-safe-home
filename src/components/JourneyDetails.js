import { React, useState, useEffect } from 'react'

// remember walking journey deatils are in props
function JourneyDetails(props) {
    const [travelMode, setTravelMode] = useState('walking')
    const [taxiReg, setTaxiReg] = useState('')
    const [busService, setBusService] = useState('')
    const [trainService, setTrainService] = useState('')
    const [travelCompanion, setTravelCompanion] = useState('')
    const [other, setOther] = useState('')

    // const saveDetails

    return (
        <div className='journeyContent'>
            <label>
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
                    <option value='bus'>bus</option>
                    <option value='other'>other</option>
                </select>
            </label>

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
