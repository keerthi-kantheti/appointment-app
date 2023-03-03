// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    date: '',
    title: '',
    starButtonClicked: false,
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({title: event.target.value})
  }

  onClickFormAddButton = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,

      date,
      isStarred: false,
    }
    if (title.length !== 0 && date !== undefined) {
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({
      starButtonClicked: !prevState.starButtonClicked,
    }))
  }

  onClickStarImage = id => {
    const {appointmentsList} = this.state
    const reqList = appointmentsList.map(each => {
      if (id === each.id) {
        return {...each, isStarred: !each.isStarred}
      }
      return each
    })
    this.setState({appointmentsList: reqList})
  }

  getStarredAppointments = () => {
    const {appointmentsList} = this.state
    const starredAppointmentsList = appointmentsList.filter(
      each => each.isStarred,
    )
    return starredAppointmentsList
  }

  render() {
    const {appointmentsList, title, date, starButtonClicked} = this.state
    const starButtonClassName =
      starButtonClicked === true ? 'starred-button-on' : 'starred-button-off'
    const filteredList = starButtonClicked
      ? this.getStarredAppointments()
      : appointmentsList
    // console.log(date)
    // console.log(title)
    // console.log(appointmentsList)
    return (
      <div className="bg-container">
        <div className="appointments-card-container">
          <div className="appointments-top-container">
            <h1 className="appointment-main-heading">Add Appointment</h1>
            <div className="appointment-form-and-image-container">
              <form
                className="appointment-form"
                onSubmit={this.onClickFormAddButton}
              >
                <label htmlFor="titleInput" className="title-label">
                  Title
                </label>

                <input
                  type="text"
                  id="titleInput"
                  placeholder="Title"
                  className="title-input"
                  onChange={this.onChangeTitleInput}
                  value={title}
                />

                <label htmlFor="dateInputElement" className="date-label">
                  Date
                </label>

                <input
                  type="date"
                  id="dateInputElement"
                  className="date-input"
                  onChange={this.onChangeDateInput}
                  value={date}
                />

                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-bottom-container">
            <div className="appointments-bottom-heading-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={starButtonClassName}
                onClick={this.onClickStarredButton}
              >
                Starred
              </button>
            </div>
            <ul>
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  itemDetails={eachAppointment}
                  key={eachAppointment.id}
                  onClickStarImage={this.onClickStarImage}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
