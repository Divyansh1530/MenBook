import { useState } from 'react'
import Signup from './pages/Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route
      path="/signup"
      element={<Signup />}
      />
      <Route
      path="/login"
      element={<Login />}
      />
     </Routes>
    </BrowserRouter>
  )
}

export default App
