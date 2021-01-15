import React, { useState } from 'react'
import { Button, DatePicker } from 'antd'

function AddExercise(props) {

    const blankExercise = { description: "", username: props.users[0] ? props.users[0].username : "", duration: 0, date: "" }
    const [exercise, setExercise] = useState(blankExercise)
    const [error, setError] = useState(0)

    const dynamicChangeFunc = (ev) => {
        const tempEx = { ...exercise, [ev.target.name]: ev.target.value }
        setExercise(tempEx)
    }

    const validator = (ev) => {
        ev.preventDefault()
        const { description, duration, date } = exercise
        if (description.length && duration > 0 && date.length) {
            setError("Accepted")
            props.saveNewExercise(exercise)
        }
        else {
            setError("No values may be blank")
        }
    }

    return (
        <>
            {error ? <p style={{color:"red"}}>{error}</p> : <p>Add exercise</p>}
            <form onSubmit={validator}>
                <input name='description' placeholder='description' onChange={dynamicChangeFunc} value={exercise.description}></input>
                <select name='username' onChange={dynamicChangeFunc} value={exercise.username}>
                    {props.users.map(user => <option key={user._id}>{user.username}</option>)}
                </select>
                <input name='duration' placeholder='duration' type='number' onChange={dynamicChangeFunc} value={exercise.duration}></input>
                <input name='date' placeholder='date' type='date' onChange={dynamicChangeFunc} value={exercise.date}></input>
                <Button type='submit' type='primary'>Add</Button>
            </form>
        </>
    )
}

export default AddExercise
