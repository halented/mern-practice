import './App.css';
import AddUserPage from './comps/addUserPage'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  const [exercises, changeExercises] = useState([])
  return (
    <Router>
      <div className="App">
          <Link to='/addUser'>Add a New User</Link>
          <Link to='/addExercise'>Add a New Exercise</Link>
      </div>
      <Switch>
        <Route path='/addUser'>
          <AddUserPage />
        </Route>
        <Route path='/addExercise'></Route>
      </Switch>
    </Router>
  );
}

export default App;
