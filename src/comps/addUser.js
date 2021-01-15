import React, { useState } from 'react'

function AddUser(props) {

    const [username, changeUsername] = useState("")

    return (
        <form onSubmit={(ev)=>props.saveNewUser(ev, username)}>
            <input 
                placeholder='username' 
                name='username' 
                value={username} 
                onChange={(ev)=>{
                    changeUsername(ev.target.value)
                }}>
            </input>
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddUser
