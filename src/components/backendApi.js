import Axios from 'axios'

const newsApi = Axios.create({
    baseURL: 'https://safe-home-api.herokuapp.com/api',
})

export const getUsers = async () => {
    const { data } = await newsApi.get('/users')
    return data.users
}