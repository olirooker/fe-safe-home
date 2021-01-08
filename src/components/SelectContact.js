import { React, useState, useEffect } from 'react'
import { getContactsByUid } from './backendApi'

function SelectContact(props) {
    const [chosenContact, setChosenContact] = useState({})
    const [contacts, setContacts] = useState([])
    const [apiCalled, setApiCalled] = useState(false)

    useEffect(() => {
        if (!apiCalled) {
            fetchAllContacts()
        }
    }, [])

    // uid is hard coded
    const fetchAllContacts = () => {
        getContactsByUid('ouq2Vs5hq4afIZiEBV0wIUb8Fk03').then((response) => {
            console.log(response.contacts, 'contacts')
            setContacts(response.contacts)
            setApiCalled(true)
        })
    }

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
                    {contacts.map((contact) => {
                        return (
                            <option value={contact.first_name}>
                                {contact.first_name}
                            </option>
                        )
                    })}
                </select>
            </label>
        </div>
    )
}

export default SelectContact
