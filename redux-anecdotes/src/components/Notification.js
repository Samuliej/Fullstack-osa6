import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    // Set and clear timeout if there is an notification to be shown
    if (notification && notification.duration) {
      const timeout = setTimeout(() => {
        dispatch(clearNotification())
      }, notification.duration * 1000)

      return () => clearTimeout(timeout)
    }
  }, [dispatch, notification])

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // Hide if no notification
  if (!notification || !notification.message) {
    style = {
      display: 'none'
    }
  }

  // If notification and notification.message exists, show notification
  return (
    <div style={style}>
      {notification && notification.message && notification.message}
    </div>
  )
}

export default Notification