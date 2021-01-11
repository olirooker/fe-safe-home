import axios from 'axios'

export const getOriginCoord = (origin) => {
    return axios
        .get(
            `http://api.positionstack.com/v1/forward?access_key=f057bf6425c9fc6624f68f585db51741&query=${origin}`
        )
        .then((response) => {
            const coordinates = {
                lat: response.data.data[0].latitude.toString(),
                lng: response.data.data[0].longitude.toString(),
            }
            return coordinates
        })
}

export const getAddressFromCoord = (coords) => {
    const latStr = coords.lat.toString()
    const lngStr = coords.lng.toString()

    return axios
        .get(
            `http://api.positionstack.com/v1/reverse?access_key=f057bf6425c9fc6624f68f585db51741&query=${latStr},${lngStr}`
        )
        .then((response) => {
            return response.data.data[0].label
        })
}
