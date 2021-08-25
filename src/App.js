import {AppRouter} from './auth/components/app-router/app-router'
import AuthGuard from './auth/components/auth-guard'

function App() {
  return (
    <AuthGuard>
      <AppRouter />
    </AuthGuard>
  )
}

export default App
