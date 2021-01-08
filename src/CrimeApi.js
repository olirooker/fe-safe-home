const axios = require('axios')
const crimeApi = axios.create({ baseURL: 'https://data.police.uk/api' })
const types = ['robbery', 'violence-crime', 'other-crime']
export const getCrimesByLocation = async (lat, lng) => {
    const data = await Promise.all(
        types.map((type) => {
            return crimeApi.get(
                `/crimes-street/${type}?&lat=${lat}&lng=${lng}&date=2020-01`
            )
        })
    )
    const locations = data.map((data) => {
        const crimes = data.data.map((crime) => {
            return {
                lat: crime.location.latitude,
                lng: crime.location.longitude,
            }
        })
        return crimes
    })
    return locations
}
