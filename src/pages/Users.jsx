import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import UserCard from '../components/UserCard'
import AlertMessage from '../components/AlertMessage'

function Users() {
  const [users, setUsers]     = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert]     = useState({ msg: '', type: '' })
  const [search, setSearch]   = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  // Filter users whenever search or users changes
  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(
      users.filter(u =>
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      )
    )
  }, [search, users])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      // GET /api/users
      const res = await API.get('/users')
      setUsers(res.data)
      setFiltered(res.data)
    } catch (err) {
      showAlert('Failed to load users. Is backend running?', 'error')
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id) => {
    if (!confirm('Delete this user?')) return
    try {
      // DELETE /api/users/5
      await API.delete(`/users/${id}`)
      showAlert('User deleted successfully!', 'success')
      fetchUsers()
    } catch (err) {
      showAlert('Failed to delete user!', 'error')
    }
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert({ msg: '', type: '' }), 3500)
  }

  // Stats
  const totalUsers  = users.length
  const activeUsers = users.filter(u => u.active).length
  const adminUsers  = users.filter(u => u.role === 'ADMIN').length

  return (
    <div className="page">
      <h1 className="page-title">User Directory</h1>
      <p className="page-subtitle">Manage all registered users</p>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{totalUsers}</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Active</div>
          <div className="stat-value">{activeUsers}</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-label">Admins</div>
          <div className="stat-value">{adminUsers}</div>
        </div>
      </div>

      {/* Search + Refresh */}
      <div className="search-bar">
        <input
          className="form-input"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchUsers}>
          ↻ Refresh
        </button>
      </div>

      <AlertMessage message={alert.msg} type={alert.type} />

      {/* Users List */}
      {loading ? (
        <div className="empty">
          <div className="spinner spinner-dark"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">👥</div>
          <p>No users found</p>
        </div>
      ) : (
        filtered.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={(id) => navigate(`/edit/${id}`)}
            onDelete={deleteUser}
          />
        ))
      )}
    </div>
  )
}

export default Users;
