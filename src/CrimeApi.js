const axios = require('axios')
const crimeApi = axios.create({ baseURL: 'https://data.police.uk/api' })
const types = ['robbery', 'violence-crime', 'other-crime']
export const getCrimesByLocation = async (lat, lng) => {
    let lastMonth = new Date()
    lastMonth.setDate(1)
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    lastMonth = lastMonth.toISOString().split('T')[0].slice(0, 6)
    let previousMonth = new Date()
    previousMonth.setDate(1)
    previousMonth.setMonth(previousMonth.getMonth() - 2)
    previousMonth = previousMonth.toISOString().split('T')[0].slice(0, 6)
    const dataOne = await Promise.all(
        types.map((type) => {
            return crimeApi.get(`/crimes-street/${type}?&lat=${lat}&lng=${lng}`)
        })
    )
    const dataTwo = await Promise.all(
        types.map((type) => {
            return crimeApi.get(
                `/crimes-street/${type}?&lat=${lat}&lng=${lng}&date=${lastMonth}`
            )
        })
    )
    const dataThree = await Promise.all(
        types.map((type) => {
            return crimeApi.get(
                `/crimes-street/${type}?&lat=${lat}&lng=${lng}&date=${previousMonth}`
            )
        })
    )
    const locationsOne = dataOne.map((data) => {
        const crimes = data.data.map((crime) => {
            return {
                lat: crime.location.latitude,
                lng: crime.location.longitude,
            }
        })
        return crimes
    })
    const locationsTwo = dataTwo.map((data) => {
        const crimes = data.data.map((crime) => {
            return {
                lat: crime.location.latitude,
                lng: crime.location.longitude,
            }
        })
        return crimes
    })
    const locationsThree = dataThree.map((data) => {
        const crimes = data.data.map((crime) => {
            return {
                lat: crime.location.latitude,
                lng: crime.location.longitude,
            }
        })
        return crimes
    })
    let locations = []
    locations.push(locationsOne, locationsTwo, locationsThree)
    const result = []
    locations.forEach((location) => {
        location.forEach((eachLocation) => {
            result.push(eachLocation)
        })
    })

    console.log(result, 'CRIMES')

    return result
}
