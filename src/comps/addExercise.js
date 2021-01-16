import React, { useState } from 'react'
import { Form, Input, Button, DatePicker, Select, InputNumber } from 'antd';

const { Option } = Select
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


function AddExercise(props) {

    const blankExercise = { description: "", username: props.users[0] ? props.users[0].username : "Select One", duration: 0, date: "" }
    const [form] = Form.useForm()
    const [exercise, setExercise] = useState(blankExercise)
    const [error, setError] = useState(0)

    const dynamicChangeFunc = (ev) => {
        let tempEx = { ...exercise }

        // select event is weird, ant design made it so 
        // we dont actually get an event just the value
        typeof (ev) === "object" ?
            tempEx[ev.target.name] = ev.target.value
            :
            tempEx.username = ev

        setExercise(tempEx)
    }

    const validator = (ev) => {
        const { description, duration, date, username } = exercise
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

    const updateForm = (eventInfo) => {
        // debugger
        // should be a switch
        console.log(eventInfo);
        if (typeof (eventInfo) === "object") {
            form.setFieldsValue({
                [eventInfo.target.id]: eventInfo.target.value
            })
        }
        else if (typeof (eventInfo) === 'string') {
            form.setFieldsValue({
                username: eventInfo
            })
        }
        else {
            form.setFieldsValue({
                duration: eventInfo
            })
        }
    }

    return (
        <>
            <h1>add exercisio</h1>
            <Form {...layout} onFinish={validator} label="Add Exercise" form={form}>
                <Form.Item
                    name='description'
                    onChange={updateForm}
                    label='description'
                    rules={[
                        {
                            required: true,
                            message: 'A description is required',
                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name='username'
                    label='username'
                    rules={[
                        {
                            required: true,
                            message: 'A username is required',
                        }
                    ]}>
                    <Select
                        placeholder='Select One'
                        onChange={updateForm}>
                        {props.users.map(user =>
                            <Option key={user.username}>{user.username}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="duration"
                    name='duration'
                    rules={[
                        {
                            required: true,
                            message: 'Select zero if duration is not applicable'
                        }
                    ]}>
                    <InputNumber onChange={updateForm} />
                </Form.Item>
                <Form.Item
                    label="date"
                    name='date'>
                    <DatePicker onChange={updateForm} />
                </Form.Item>
                <Form.Item label='submit'>
                    <Button type='primary' htmlType='submit'> ♥️ </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddExercise
