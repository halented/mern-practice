import './App.css';
import AddUser from './comps/addUser'
import AddExercise from './comps/addExercise'
import Home from './comps/home'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
    <>
      <Router>
        <Switch>
          <Route path='/addUser'>
            <AddUser saveNewUser={saveNewUser} />
          </Route>
          <Route path='/addExercise'>
            <AddExercise saveNewExercise={saveNewExercise} users={users} />
          </Route>
          <Route path='/'>
            <Home exercises={exercises} users={users}/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
