import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import AlertMessage from '../components/AlertMessage'

function EditUser() {
  const { id } = useParams()          // gets :id from URL /edit/5
  const navigate = useNavigate()
  const [form, setForm]       = useState({
    username: '',
    phone: '',
    role: 'USER',
    active: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [alert, setAlert]     = useState({ msg: '', type: '' })

  // Load user data when page opens
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // GET /api/users/5
        const res = await API.get(`/users/${id}`)
        const u = res.data
        setForm({
          username: u.username || '',
          phone:    u.phone    || '',
          role:     u.role     || 'USER',
          active:   u.active
        })
      } catch (err) {
        showAlert('Failed to load user!', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.phone) {
      return showAlert('Username and phone required!', 'error')
    }

    setSaving(true)
    try {
      // PUT /api/users/5
      await API.put(`/users/${id}`, {
        ...form,
        active: form.active === 'true' || form.active === true
      })
      showAlert('User updated successfully!', 'success')
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed!'
      showAlert(msg, 'error')
    } finally {
      setSaving(false)
    }
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert({ msg: '', type: '' }), 4000)
  }

  if (loading) {
    return (
      <div className="page">
        <div className="empty">
          <div className="spinner spinner-dark"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Edit User</h1>
      <p className="page-subtitle">Update user information (ID: {id})</p>

      <div className="card" style={{ maxWidth: 560 }}>
        <AlertMessage message={alert.msg} type={alert.type} />

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group">
              <label className="form-label">USERNAME</label>
              <input
                className="form-input"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">PHONE</label>
              <input
                className="form-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>

            <div className="form-group">
              <label className="form-label">ROLE</label>
              <select
                className="form-input"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">STATUS</label>
              <select
                className="form-input"
                name="active"
                value={String(form.active)}
                onChange={handleChange}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
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
              disabled={saving}
            >
              {saving ? <span className="spinner"></span> : ''}
              {saving ? ' Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser
