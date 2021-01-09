import React from 'react'
import Toggle from './Toggler'
import HomeIconSphere from '../icons/HomeIconSphere.png'

const Header = (props) => {
    return (
        <div className='headerDiv'>
            <img src={HomeIconSphere} className='HomeIcon' alt='icon'></img>
            <h1 className='headerContent'>Safe Home</h1>
        </div>
    )
}

export default Header
