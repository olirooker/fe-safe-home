import axios from 'axios'

export const getOriginCoord = (origin) => {
    return axios
        .get(
            // `http://api.positionstack.com/v1/forward?access_key=f057bf6425c9fc6624f68f585db51741&query=${origin}`
            `https://eu1.locationiq.com/v1/search.php?key=pk.6a9d6e8e4c85dd1d973db43062cf8bf8&q=${origin}&format=json`
        )
        .then((response) => {
            const coordinates = {
                lat: response.data[0].lat,
                lng: response.data[0].lon,
            }
            return coordinates
        })
        .catch((err) => {
            console.log(err, 'BIG ERROR')
        })
}

export const getAddressFromCoord = (coords) => {
    const latStr = coords.lat.toString()
    const lngStr = coords.lng.toString()

    return axios
        .get(
            // `http://api.positionstack.com/v1/reverse?access_key=f057bf6425c9fc6624f68f585db51741&query=${latStr},${lngStr}`
            `https://eu1.locationiq.com/v1/reverse.php?key=pk.6a9d6e8e4c85dd1d973db43062cf8bf8&lat=${latStr}&lon=${lngStr}&format=json`
        )
        .then((response) => {
            console.log(response, 'geolocation')
            const address = `${response.data.address.road}, ${response.data.address.postcode}`

            return address
        })
        .catch((err) => {
            console.log(err, 'BIG ERROR')
        })
}
