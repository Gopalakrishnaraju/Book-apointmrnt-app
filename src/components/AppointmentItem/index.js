import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentItem, onToggleIsStared} = props
  const {title, date, isStared, id} = appointmentItem
  const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const starImgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const markStar = () => onToggleIsStared(id)

  return (
    <li className="list-container">
      <div className="title-star-container">
        <p className="tile-name">{title}</p>
        <button
          className="star-btn"
          type="button"
          onClick={markStar}
          data-testid="star"
        >
          <img className="star-img" src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="date">Date: {newDate}</p>
    </li>
  )
}

export default AppointmentItem
