import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Users from './pages/Users'
import Register from './pages/Register'
import Login from './pages/Login'
import EditUser from './pages/EditUser'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Users />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/edit/:id"  element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
