import { useState } from 'react'
import API from '../api/axios'
import AlertMessage from '../components/AlertMessage'

function Login() {
  const [form, setForm]     = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [alert, setAlert]   = useState({ msg: '', type: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      return showAlert('Email and password required!', 'error')
    }

    setLoading(true)
    try {
      // POST /api/auth/login
      const res = await API.post('/auth/login', form)
      showAlert(res.data, 'success') // "Login Successful"
      setForm({ email: '', password: '' })
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed!'
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
      <h1 className="page-title">Login</h1>
      <p className="page-subtitle">Sign in to your account</p>

      <div className="card" style={{ maxWidth: 460 }}>
        <AlertMessage message={alert.msg} type={alert.type} />

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

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
              <label className="form-label">PASSWORD</label>
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
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? <span className="spinner"></span> : ''}
              {loading ? ' Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
