import './App.css';
import AddUser from './comps/addUser'
import AddExercise from './comps/addExercise'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Row, Col } from 'antd'

const BASE_URL = 'http://localhost:5000'

function App() {

  const [exercises, changeExercises] = useState([])
  const [users, changeUsers] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then(res => res.json())
      .then(users => changeUsers(users))
    fetch(`${BASE_URL}/exercises`)
      .then(res => res.json())
      .then(exercises => changeExercises(exercises))
  }, [])



  const saveNewUser = (ev, username) => {
    ev.preventDefault()
    fetch(`${BASE_URL}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(res => res.json())
      .then(info => console.log(info))
  }

  const saveNewExercise = (exercise) => {
    fetch(`${BASE_URL}/exercises/add`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(exercise)
    })
      .then(res => res.json())
      .then(info => console.log(info))
  }

  return (
    <Router>
      <Switch>

        <Route path='/addUser'>
          <AddUser saveNewUser={saveNewUser} />
        </Route>
        <Route path='/addExercise'>
          <AddExercise saveNewExercise={saveNewExercise} users={users} />
        </Route>
        <Route path='/'>
          <div className="App">
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
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
