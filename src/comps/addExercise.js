import React from 'react'
import { Form, Input, Button, DatePicker, Select, InputNumber } from 'antd';
import { Link } from 'react-router-dom'

const { Option } = Select
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 14,
    },
};


function AddExercise(props) {

    const [form] = Form.useForm()

    const submitForm = (ev) => {
        // convert the date for mongodb
        ev.date = ev.date.format()
        // send it off & hope for the best
        props.saveNewExercise(ev)
    }

    const updateForm = (eventInfo) => {
        // controlling form with antd is pretty awkward
        if (typeof (eventInfo) === "object") {
            if (eventInfo._isAMomentObject) {
                form.setFieldsValue({
                    date: eventInfo.get()
                })
            }
            else {
                form.setFieldsValue({
                    [eventInfo.target.id]: eventInfo.target.value
                })
            }
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

    const goBack = (ev) => {
        console.log(ev);
    }

    return (
        <Form {...layout} onFinish={(ev) => submitForm(ev)} label="Add Exercise" form={form} className='form'>
            <Form.Item label='Add New Exercise' style={{ fontWeight: "bold" }}></Form.Item>
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
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
                {" "}
                <Link to='/'>
                    <Button htmlType="button" onClick={goBack}>
                        Go Back
                    </Button>
                </Link>
            </Form.Item>
        </Form>
    )
}

export default AddExercise
