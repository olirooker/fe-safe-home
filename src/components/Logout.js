import React from 'react'
import { auth, provider, firebase } from '../FirebaseConfig.js'
import styled from 'styled-components'

const LogoutButton = styled.button`
    border: 2px solid ${({ theme }) => theme.toggleBorder};
    border-radius: 30px;
    cursor: pointer;
    font-size: 0.5rem;
    justify-content: space-between;
    justify-self: left;
    overflow: hidden;
    padding: 0.5rem;
    width: 4rem;
    height: 3rem;
`
const Logout = (props) => {
    return <LogoutButton onClick={props.logout}>LOGOUT</LogoutButton>
}
export default Logout
