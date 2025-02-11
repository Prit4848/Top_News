import React from 'react'
import AppRouter from './routers/AppRouter'
import {UserProvider} from './context/UserContext'
import { NewsProvide } from './context/NewsContext'

const App = () => {
  return (
    <UserProvider>
      <NewsProvide>
      <AppRouter/>
      </NewsProvide>
    </UserProvider>
  )
}

export default App