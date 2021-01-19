import React from 'react'
import { Row, Col, PageHeader, Button, Alert } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

function Home({ exercises, users, alert }) {
    return (
        <>
            <PageHeader
                className="site-page-header"
                title="Welcome to Some Weird Website"
                subTitle="When you're here, you're fu-"
            />
            <Row>
                {alert ? <Alert message="Success" type='success' /> : null}
            </Row>
            <Row>
                <Col span={12}>
                    <Button>
                        <Link to='/addUser'>Add a New User <ArrowRightOutlined /></Link>
                    </Button>
                </Col>
                <Col span={12}>
                    <Button>
                        <Link to='/addExercise'>Add a New Exercise <ArrowRightOutlined /></Link>
                    </Button>
                </Col>
            </Row>
            <Row>

                <Col span={12}>
                    <h3>Available users</h3>
                    <ul style={{ padding: '24px', paddingTop: '0px', listStyle: 'none' }}>
                        {users.map(user => <li key={user._id}>{user.username}</li>)}
                    </ul>
                </Col>
                <Col span={12}>
                    <h3> Available exercises</h3>
                    <ul style={{ padding: '24px', paddingTop: '0px', listStyle: 'none' }}>
                        {exercises.map(ex => <li key={ex._id}>{ex.description}</li>)}
                    </ul>
                </Col>
            </Row>

        </>
    )
}

export default Home
