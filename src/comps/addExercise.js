import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, Select } from 'antd';

const { Option } = Select


function AddExercise(props) {

    const blankExercise = { description: "", username: props.users[0] ? props.users[0].username : "Select One", duration: 0, date: "" }
    const [exercise, setExercise] = useState(blankExercise)
    const [error, setError] = useState(0)

    const dynamicChangeFunc = (ev) => {
        let tempEx = {...exercise}

        // select event is weird, ant design made it so 
        // we dont actually get an event just the value
        typeof(ev) === "object" ? 
        tempEx[ev.target.name] = ev.target.value
        :
        tempEx.username = ev

        setExercise(tempEx)
    }

    const validator = (ev) => {
        const { description, duration, date, username} = exercise
        console.log(exercise)
        console.log(ev);

        if (description.length && duration > 0 && date.length && username !== "Select One") {
            setError("Accepted")
            props.saveNewExercise(exercise)
        }
        else {
            setError("No values may be blank")
        }
    }

    return (
        <>
            {error ? <p style={{ color: "red" }}>{error}</p> : <p>Add exercise</p>}
            <Form onFinish={validator}>
                <Form.Item>
                    <Input
                        name='description'
                        placeholder='description'
                        onChange={dynamicChangeFunc}
                        value={exercise.description}>
                    </Input>
                </Form.Item>
                <Form.Item>
                    <Select
                        onChange={dynamicChangeFunc}
                        value={exercise.username}
                        defaultValue='Select One'>
                        <Option defaultValue value='Select One'>Select One</Option>
                        {props.users.map(user =>
                            <Option key={user.username}>{user.username}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <input
                        name='duration'
                        placeholder='duration'
                        type='number'
                        onChange={dynamicChangeFunc}
                        value={exercise.duration}>
                    </input>
                </Form.Item>
                <Form.Item>
                    <input
                        name='date'
                        placeholder='date'
                        type='date'
                        onChange={dynamicChangeFunc}
                        value={exercise.date}>
                    </input>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Add</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddExercise
