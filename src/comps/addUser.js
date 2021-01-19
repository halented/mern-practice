import React from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader, Form, Input, Button } from 'antd'

function AddUser({ saveNewUser }) {

    const history = useHistory()
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 14,
        },
    };

    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => history.push('/')}
                title="Add New User"
            />
            <Form onFinish={(eventInfo) => saveNewUser(eventInfo)} {...layout}>
                <Form.Item
                    name='username'
                    label='Username'
                    rules={[
                        {
                            required: true,
                            message: 'A username is required',
                        }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type='primary' htmlType='Submit'>
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddUser
