const axios = require('axios')
const crimeApi = axios.create({ baseURL: 'https://data.police.uk/api' })
const latLng = { lat: 53.4808, lng: -2.2462 }
const types = ['robbery', 'violence-crime', 'other-crime']
const getCrimesByLocation = async (lat, lng, type) => {
    const data = await Promise.all(
        types.map((type) => {
            return crimeApi.get(
                `/crimes-street/${type}?&lat=${lat}&lng=${lng}&date=2020-01`
            )
        })
    )
    const locations = data[0].data.map((crime) => {
        return { lat: crime.location.latitude, lng: crime.location.longitude }
    })
    console.log(locations, 'locations')
    return locations
}
const crimesArray = types.map(() => {
    return getCrimesByLocation(latLng.lat, latLng.lng)
})
console.log(crimesArray)
