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
            // console.log(coordinates, 'coordinates')
            // setOrigin(coordinates)
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

// Alba Mateos  2:48 PM
// http://api.positionstack.com/v1/reverse
//     ? access_key = YOUR_ACCESS_KEY
//     & query = 40.7638435,-73.9729691
