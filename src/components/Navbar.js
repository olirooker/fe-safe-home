import React from 'react'
import { Link } from '@reach/router'
const Navbar = (props) => {
    return (
        <div className="nav">
            <Link to="/main" className="navButton">
                Main
            </Link>{' '}
            <Link to="/user-profile" className="navButton">
                User Profile
            </Link>
            <Link to="/travel-advice" className="navButton">
                Travel Advice
            </Link>
        </div>
    )
}
export default Navbar
