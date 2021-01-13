import { React, createRef } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

function SelectContact(props) {
    const { saveContact, contacts } = props

    return (
        <div>
            <FormControl
                variant='filled'
                className='form-control'
                style={{ minWidth: 224 }}
            >
                <InputLabel id='demo-simple-select-filled-label'>
                    Select Emergency Contact
                </InputLabel>
                <Select
                    labelId='demo-simple-select-filled-label'
                    id='demo-simple-select-filled'
                    onChange={(event) => {
                        saveContact(event.target.value)
                    }}
                    className='form-control'
                    required
                >
                    {contacts.length > 0 ? (
                        contacts.map((contact) => {
                            return (
                                <MenuItem
                                    value={contact.first_name}
                                    key={contact.first_name}
                                    ref={createRef}
                                >
                                    {contact.first_name}
                                </MenuItem>
                            )
                        })
                    ) : (
                        <MenuItem value={''} key={''} ref={''}>
                            No Contacts Saved
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectContact
