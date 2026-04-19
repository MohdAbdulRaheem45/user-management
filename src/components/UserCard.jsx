function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <div className="avatar">
        {user.username?.[0]?.toUpperCase() || '?'}
      </div>

      <div className="user-info">
        <div className="user-name">{user.username}</div>
        <div className="user-email">{user.email}</div>
        <div className="user-phone">{user.phone}</div>
      </div>

      <div className="user-badges">
        <span className={`badge ${user.role === 'ADMIN' ? 'badge-admin' : 'badge-user'}`}>
          {user.role}
        </span>
        <span className={`badge ${user.active ? 'badge-active' : 'badge-inactive'}`}>
          {user.active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="user-actions">
        <button className="btn btn-ghost btn-sm" onClick={() => onEdit(user.id)}>
          ✎ Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(user.id)}>
          ✕ Delete
        </button>
      </div>
    </div>
  )
}

export default UserCard
