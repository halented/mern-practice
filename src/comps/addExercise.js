import React, { useState } from 'react'

function AddExercise(props) {

    const blankExercise = { description: "", username: props.users[0] ? props.users[0].username: "", duration: 0, date: "" }
    const [exercise, setExercise] = useState(blankExercise)

    const dynamicChangeFunc = (ev) => {
        const tempEx = { ...exercise, [ev.target.name]: ev.target.value }
        setExercise(tempEx)
    }

    return (
        <form onSubmit={(ev) => props.saveNewExercise(ev, exercise)}>
            <input name='description' placeholder='description' onChange={dynamicChangeFunc} value={exercise.description}></input>
            <select name='username' onChange={dynamicChangeFunc} value={exercise.username}>
                {props.users.map(user => <option key={user._id}>{user.username}</option>)}
            </select>
            <input name='duration' placeholder='duration' type='number' onChange={dynamicChangeFunc} value={exercise.duration}></input>
            <input name='date' placeholder='date' type='date' onChange={dynamicChangeFunc} value={exercise.date}></input>
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddExercise
