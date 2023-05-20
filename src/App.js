import {Route, Switch} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import Home from './components/Home'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/signUp" component={SignUpPage} />
    <Route path="/home" component={Home} />
  </Switch>
)

export default App
