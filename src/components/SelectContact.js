import { React, useState, useEffect } from 'react'
import { getContactsByUid } from './backendApi'

function SelectContact(props) {
    const [contacts, setContacts] = useState([])
    const [apiCalled, setApiCalled] = useState(false)
    const { saveContact } = props

    useEffect(() => {
        if (!apiCalled) {
            fetchAllContacts()
        }
    }, [])

    // uid is hard coded
    const fetchAllContacts = () => {
        getContactsByUid('ouq2Vs5hq4afIZiEBV0wIUb8Fk03').then((response) => {
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
                        saveContact(event.target.value)
                    }}
                >
                    {contacts.map((contact) => {
                        return (
                            <option
                                value={contact.first_name}
                                key={contact.first_name}
                            >
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
