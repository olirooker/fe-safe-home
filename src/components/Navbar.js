import React from 'react'
import { Link } from '@reach/router'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const Navbar = (props) => {
    const [value, setValue] = React.useState(2)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <Paper square>
            <Tabs
                value={value}
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
            </Tabs>
        </Paper>
    )
}

export default Navbar
