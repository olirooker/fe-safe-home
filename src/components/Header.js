import React from 'react'

import HomeIconSphere from '../icons/HomeIconSphere.png'

const Header = (props) => {
    return (
        <h1 className='headerContent'>
            <img src={HomeIconSphere} className='HomeIcon' alt='icon'></img>
            Safe Home
        </h1>
    )
}

export default Header
