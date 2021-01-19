import React from 'react'
import { Row, Col, PageHeader } from 'antd'
import { Link } from 'react-router-dom'

function Home({ exercises }) {
    return (
        <>
            <PageHeader
                className="site-page-header"
                title="Welcome to Some Weird Website"
                subTitle="When you're here, you're fu-"
            />
            <Row>
                <Col span={12}>
                    <Link to='/addUser'>Add a New User</Link>
                </Col>
                <Col span={12}>
                    <Link to='/addExercise'>Add a New Exercise</Link>
                </Col>
            </Row>
            <ul>
                {exercises.map(ex => <li key={ex._id}>{ex.description}</li>)}
            </ul>
        </>
    )
}

export default Home
