import Axios from 'axios'

const newsApi = Axios.create({
    baseURL: 'https://safe-home-api.herokuapp.com/api',
})

export const getUsers = async () => {
    const { data } = await newsApi.get('/users')
    return data.users
}

export const postNewUser = async (newUser) => {
    try {
        const { data } = await newsApi.post('/users', { newUser })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getUserByUid = async (uid) => {
    try {
        const { data } = await newsApi.get(`/users/${uid}`)
        return data
    } catch (error) {}
}

export const getContactsByUid = async (uid) => {
    try {
        const { data } = await newsApi.get(`/users/${uid}/contacts`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const postNewContact = async (newContact, uid) => {
    try {
        const { data } = await newsApi.post(`/users/${uid}/contacts`, {
            newContact,
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const sendEditUser = async (editUser, uid) => {
    try {
        const { data } = await newsApi.patch(`/users/${uid}`, {
            editUser,
        })

        return data
    } catch (error) {
        console.log(error)
    }
}

export const sendEditContact = async (editContact, uid, contact_id) => {
    try {
        const { data } = await newsApi.patch(
            `/users/${uid}/contacts/${contact_id}`,
            {
                editContact,
            }
        )
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteContactByContactId = async (uid, contact_id) => {
    try {
        const { data } = await newsApi.delete(
            `/users/${uid}/contacts/${contact_id}`
        )
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
