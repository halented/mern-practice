import React from 'react'

function AddUserPage(props) {
    return (
        <form onSubmit={props.saveNewUser}>
            <input placeholder='username' name='username'></input>
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddUserPage
