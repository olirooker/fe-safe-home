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
        const crimeCoordsArrStr = []
        crimeCoords.forEach((coordsObj) => {
            let coordArr = []
            coordArr.push(coordsObj.lat.slice(0, -4))
            coordArr.push(coordsObj.lng.slice(0, -4))

            crimeCoordsArrStr.push(coordArr)
        })

        const crimeCoordsArr = crimeCoordsArrStr.map((element) => {
            let numArr = []
            let a = parseFloat(element[0])
            let b = parseFloat(element[1])

            numArr.push([a, b])

            return numArr
        })

        const shortCoords = coords.map((coord) => {
            let coordA = parseFloat(coord[0].toFixed(2))
            let coordB = parseFloat(coord[1].toFixed(2))

            return [coordA, coordB]
        })

        const crimeCoordSum = crimeCoordsArr.map((element) => {
            return parseFloat(element[0] + element[1])
        })

        const routeCoordSum = shortCoords.map((element) => {
            return element[0] + element[1]
        })

        const matches = crimeCoordSum.filter((element) => {
            routeCoordSum.includes(element)
        })

        // console.log(crimeCoordSum, 'CRIMES')
        // console.log(routeCoordSum, 'ROUTE')
        // console.log(matches, 'MATCHES')
    }, [props.directionResponse, props.crimeData])

    return <div></div>
}

export default RouteWarning
