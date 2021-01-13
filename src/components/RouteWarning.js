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
        console.log(props.crimeData, 'CRIME DATA')
        console.log(coords, 'COORDS')
    }, [props.directionResponse, props.crimeData])

    return <div>Route Warning</div>
}

export default RouteWarning
