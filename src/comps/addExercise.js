import React, { useState } from 'react'

function AddExercise(props) {

    const dynamicChangeFunc = (ev) => {
        console.log(ev)
    }

    return (
        <form onSubmit={(ev)=>props.saveNewExercise(ev)}>
            <input name='description' placeholder='description' onChange={dynamicChangeFunc}></input>
            <select>
                {props.users.map(user=><option>{user.username}</option>)}
            </select>
            <input name='username' placeholder='username' onChange={dynamicChangeFunc}></input>
            <input name='duration' placeholder='duration' type='number' onChange={dynamicChangeFunc}></input>
            <input name='date' placeholder='date' type='date' onChange={dynamicChangeFunc}></input>
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddExercise
