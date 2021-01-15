import './App.css';
import AddUser from './comps/addUser'
import AddExercise from './comps/addExercise'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  
  const [exercises, changeExercises] = useState([])
  // should grab users in a useEffect and pass that down to addExercise
  const [users, changeUsers] = useState([])

 const saveNewUser = (ev, username) => {
   ev.preventDefault()
   fetch('http://localhost:5000/users/add', {
     method: "POST",
     headers: {
       "Content-Type": 'application/json',
       "Accept": 'application/json'
     },
     body: JSON.stringify({username})
   })
   .then(res=>res.json())
   .then(info=>console.log(info))
 }

 const saveNewExercise = (ev) => {
  ev.preventDefault()
 }

  return (
    <Router>
      <Switch>
        <Route path='/addUser'>
          <AddUser saveNewUser={saveNewUser}/>
        </Route>
        <Route path='/addExercise'>
          <AddExercise saveNewExercise={saveNewExercise} users={users} />
        </Route>
        <Route path='/'>
          <div className="App">
            <Link to='/addUser'>Add a New User</Link>
            <Link to='/addExercise'>Add a New Exercise</Link>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
