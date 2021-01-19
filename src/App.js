import './App.css';
import AddUser from './comps/addUser'
import AddExercise from './comps/addExercise'
import Home from './comps/home'
import EditExercise from './comps/editExercise';
import { useState, useEffect } from 'react'
import { Switch, Route, useHistory, withRouter } from 'react-router-dom'

const BASE_URL = 'http://localhost:5000'


function App() {

  const [exercises, changeExercises] = useState([])
  const [users, changeUsers] = useState([])
  const [alert, changeAlert] = useState(false)
  const [selectedExercise, changeSelectedExercise] = useState({})
  const history = useHistory()

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then(res => res.json())
      .then(users => changeUsers(users))
    fetch(`${BASE_URL}/exercises`)
      .then(res => res.json())
      .then(exercises => changeExercises(exercises))
  }, [])



  const saveNewUser = (username) => {
    fetch(`${BASE_URL}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(username)
    })
      .then(res => res.json())
      .then(info => {
        let newGroup = [...users, info]
        changeUsers(newGroup)
        changeAlert(true)
        history.push('/')
      })
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
      .then(info => {
        let newGroup = [...exercises, info]
        changeExercises(newGroup)
        changeAlert(true)
        history.push('/')
      })
  }

  const selectExercise = (exercise) => {
    changeSelectedExercise(exercise)
    history.push(`/edit/${exercise._id}`)
  }

  return (
    <>
      <Switch>
        <Route path='/addUser'>
          <AddUser saveNewUser={saveNewUser} />
        </Route>
        <Route path='/addExercise'>
          <AddExercise saveNewExercise={saveNewExercise} users={users} />
        </Route>
        <Route path='/edit/:id'>
          <EditExercise exercise={selectedExercise} />
        </Route>
        <Route path='/'>
          <Home
            exercises={exercises}
            users={users}
            alert={alert}
            sendClickedExercise={selectExercise}
          />
        </Route>
      </Switch>
    </>
  );
}

export default withRouter(App);
