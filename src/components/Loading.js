import React from 'react'
import ReactLoading from 'react-loading'

const Loading = () => {
    return (
        <div className='loading'>
            <ReactLoading
                type={'spin'}
                color={'#00A99D'}
                height={50}
                width={50}
            />
        </div>
    )
}
export default Loading
