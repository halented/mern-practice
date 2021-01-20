import React, { useEffect } from 'react'
import {
    Form,
    Input,
    Button,
    DatePicker,
    Select,
    InputNumber,
    PageHeader,
    Popconfirm
} from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import * as moment from 'moment';



const { Option } = Select
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 14,
    },
};


function AddOrEdit(props) {
    const [form] = Form.useForm()
    const history = useHistory()

    useEffect(() => {
        if (props.selectedExercise) {
            const { username, description, duration, date } = props.selectedExercise
            form.setFieldsValue({
                username: username,
                description: description,
                duration: duration,
                date: moment(date)
            })
        }
    })

    const formatAndSubmit = (ev) => {
        // convert the date for mongodb
        ev.date = ev.date.format()

        // send along the ID if it's an edit, otherwise just the new data
        props.selectedExercise ?
            props.submitForm(ev, props.selectedExercise._id)
            :
            props.submitForm(ev)
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

    const title = () => {
        return props.selectedExercise ? `Editing ${props.selectedExercise.description}` : "Add New Exercise"
    }

    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => history.push('/')}
                title={title()}
                subTitle="Please fill out all fields"
            />
            <Form
                {...layout}
                onFinish={(ev) => formatAndSubmit(ev)}
                label="Add Exercise"
                form={form}
                className='form'>
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
                        Submit <FormOutlined />
                    </Button>
                    {" "}
                    {
                        props.selectedExercise ?
                            <>
                                <Popconfirm
                                    title="Are you sure you'd like to delete this exercise?"
                                    onConfirm={() => props.deleteExercise(props.selectedExercise)}
                                    onCancel={null}
                                    okText="Yes"
                                    cancelText="No">
                                    <Button danger>
                                        Delete <DeleteOutlined />
                                    </Button>
                                </Popconfirm>
                            </>
                            :
                            null
                    }
                </Form.Item>
            </Form>
        </>
    )
}

export default AddOrEdit
