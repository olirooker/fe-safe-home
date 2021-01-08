import { React, useState, useEffect, useContext } from 'react'
import { getUsers } from './backendApi'
import Loading from './Loading'

function UserProfile(props) {
    const [firebaseUid, setFirebaseUid] = useState('')
    const [users, setUsers] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isNewUser, setIsNewUser] = useState(false)

    // set state
    useEffect(() => {
        setFirebaseUid(props.userId)
        setIsLoading(false)
        setIsNewUser(props.isNewUser)
    }, [])

    console.log(firebaseUid, 'UID')

    return (
        <div className='userProfileContent'>
            {isLoading ? (
                <Loading />
            ) : isNewUser ? (
                <>New User Profile</>
            ) : (
                <>User Profile</>
            )}
        </div>
    )
}

export default UserProfile
