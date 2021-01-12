import React from 'react'
import { Link } from '@reach/router'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom'

const NewTabs = withStyles({
    indicator: {
        backgroundColor: '#00A99D',
    },
})(Tabs)

const Navbar = (props) => {
    const [value, setValue] = React.useState(2)
    const location = useLocation()
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <Paper square>
            <NewTabs
                value={location.pathname}
                indicatorColor='primary'
                textColor='primary'
                onChange={handleChange}
                aria-label='disabled tabs example'
                className='nav'
            >
                <Tab label='Main' to='/main' component={Link} />
                <Tab label='User Profile' to='/user-profile' component={Link} />
                <Tab
                    label='Travel Advice'
                    to='/travel-advice'
                    component={Link}
                />
            </NewTabs>
        </Paper>
    )
}

export default Navbar
