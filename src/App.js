import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import LoginPage from './auth/components/login-page/login-page'

const Home = () => <h1>Home Route</h1>

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
