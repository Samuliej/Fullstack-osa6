import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // Hide if no notification
  if (notification === null) {
    style = {
      display: 'none'
    }
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification