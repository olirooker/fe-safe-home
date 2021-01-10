import React from 'react'
import { Link } from '@reach/router'
import { func, string } from 'prop-types'

const Navbar = (props) => {
    return (
        <div className='nav'>
            <Link to='/main' className='navButton'>
                Main
            </Link>{' '}
            <Link to='/user-profile' className='navButton'>
                User Profile
            </Link>
            <Link to='/travel-advice' className='navButton'>
                Travel Advice
            </Link>
        </div>
    )
}

Navbar.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Navbar
