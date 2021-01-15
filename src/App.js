import './App.css';
import AddUser from './comps/addUser'
import AddExercise from './comps/addExercise'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  
  const [exercises, changeExercises] = useState([])

 const saveNewUser = (ev) => {
   ev.preventDefault()
   console.log(ev.target.username);
 }

  return (
    <Router>
      <Switch>
        <Route path='/addUser'>
          <AddUser saveNewUser={saveNewUser}/>
        </Route>
        <Route path='/addExercise'>
          <AddExercise />
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
