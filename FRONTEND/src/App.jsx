import React from 'react'
import AppRouter from './routers/AppRouter'
import {UserProvider} from './context/UserContext'

const App = () => {
  return (
    <UserProvider>
      <AppRouter/>
    </UserProvider>
  )
}

export default App