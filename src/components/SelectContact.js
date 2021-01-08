import { React, useState, useEffect } from 'react'

function SelectContact(props) {
    const [chosenContact, setChosenContact] = useState({})
    const [contacts, setContacts] = useState([])

    useEffect(() => {})

    return (
        <div>
            <label>
                Select Emergency Contact
                <select
                    name='cars'
                    id='cars'
                    onChange={(event) => {
                        setChosenContact(event.target.value)
                    }}
                >
                    <option value='walking'>walking</option>
                    <option value='taxi'>taxi</option>
                    <option value='bus'>bus</option>
                    <option value='other'>other</option>
                </select>
            </label>
        </div>
    )
}

export default SelectContact
