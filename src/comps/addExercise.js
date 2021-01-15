import React, { useState } from 'react'

function AddExercise(props) {
    // const [exercise, changeExercise] = useState({})

    return (
        <form onSubmit={(ev)=>props.saveNewExercise(ev)}>
            <input></input>
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddExercise
