import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import AlertMessage from '../components/AlertMessage'

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [alert, setAlert]     = useState({ msg: '', type: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    // spread old form, update only the changed field
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!form.username || !form.email || !form.password || !form.phone) {
      return showAlert('All fields are required!', 'error')
    }
    if (form.password.length < 8) {
      return showAlert('Password must be at least 8 characters!', 'error')
    }

    setLoading(true)
    try {
      // POST /api/auth/register
      const res = await API.post('/auth/register', form)
      showAlert(res.data, 'success') // "Successfully Registered"
      setForm({ username: '', email: '', password: '', phone: '' })
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed!'
      showAlert(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert({ msg: '', type: '' }), 4000)
  }

  return (
    <div className="page">
      <h1 className="page-title">Register User</h1>
      <p className="page-subtitle">Create a new account</p>

      <div className="card" style={{ maxWidth: 600 }}>
        <AlertMessage message={alert.msg} type={alert.type} />

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group">
              <label className="form-label">USERNAME</label>
              <input
                className="form-input"
                name="username"
                placeholder="john_doe"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">PHONE</label>
              <input
                className="form-input"
                name="phone"
                placeholder="+91 9999999999"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <label className="form-label">EMAIL</label>
              <input
                className="form-input"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <label className="form-label">PASSWORD (min 8 chars)</label>
              <input
                className="form-input"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? <span className="spinner"></span> : ''}
              {loading ? ' Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
