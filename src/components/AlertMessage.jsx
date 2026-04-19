function AlertMessage({ message, type }) {
  if (!message) return null
  return (
    <div className={`alert alert-${type}`}>
      {type === 'success' ? '✓' : '✕'} {message}
    </div>
  )
}

export default AlertMessage
