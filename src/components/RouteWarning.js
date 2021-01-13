import { React, useState, useEffect } from 'react'
var polyline = require('google-polyline')

function RouteWarning(props) {
    useEffect(() => {
        let coords = []
        if (props.directionResponse) {
            coords = polyline.decode(
                props.directionResponse.routes[0].overview_polyline
            )
        }

        const crimeCoords = props.crimeData
        const crimeCoordsArr = []
        crimeCoords.forEach((coordsObj) => {
            let coordArr = []
            coordArr.push(+coordsObj.lat.slice(0, -3))
            coordArr.push(+coordsObj.lng.slice(0, -3))

            crimeCoordsArr.push(coordArr)
        })

        const shortCoords = coords.map((coord) => {
            let lat = +coord[0].toFixed(3)
            let lng = +coord[1].toFixed(3)
            return [lat, lng]
        })

        console.log(crimeCoordsArr, 'FORMATTED COORDS')
        console.log(shortCoords, 'SHORT COORDS')
    }, [props.directionResponse, props.crimeData])

    return <div>Route Warning</div>
}

export default RouteWarning
