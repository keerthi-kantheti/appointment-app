// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {itemDetails, onClickStarImage} = props
  const {id, date, title, isStarred} = itemDetails

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const formattedTime = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const clickStar = () => {
    onClickStarImage(id)
  }
  return (
    <li>
      <div className="appointment-item">
        <p className="appointment-item-heading">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="appointment-item-button"
          onClick={clickStar}
        >
          <img src={starImageUrl} alt="star" className="star-image" />
        </button>
      </div>

      <p className="appointment-item-date">Date:{formattedTime}</p>
    </li>
  )
}

export default AppointmentItem
