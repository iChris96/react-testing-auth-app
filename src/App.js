import {BrowserRouter as Router} from 'react-router-dom'
import {AppRouter} from './auth/components/app-router/app-router'

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App
