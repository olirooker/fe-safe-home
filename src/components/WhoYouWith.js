import { React, useState } from 'react'

function WhoYouWith(props) {
    const {
        savePersonOne,
        personOne,
        savePersonTwo,
        personTwo,
        savePersonThree,
        personThree,
    } = props

    return (
        <div className='whoYouWithContent'>
            <p className='whoYouWithTitle'>Who You With? </p>

            <form className='whoYouWithForm'>
                <label>
                    person 1 :
                    <input
                        name='personOne'
                        type='text'
                        placeholder='personOne'
                        value={personOne}
                        onChange={(event) => savePersonOne(event.target.value)}
                    />
                </label>
                <label>
                    person 2 :
                    <input
                        name='personTwo'
                        type='text'
                        placeholder='personTwo'
                        value={personTwo}
                        onChange={(event) => savePersonTwo(event.target.value)}
                    />
                </label>
                <label>
                    person 3 :
                    <input
                        name='personThree'
                        type='text'
                        placeholder='personThree'
                        value={personThree}
                        onChange={(event) =>
                            savePersonThree(event.target.value)
                        }
                    />
                </label>
            </form>
        </div>
    )
}

export default WhoYouWith
