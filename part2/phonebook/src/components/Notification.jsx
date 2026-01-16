const Notification = ({ message, err }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={err ? "error" : "notification"}>
      {message}
    </div>
  )
}

export default Notification
