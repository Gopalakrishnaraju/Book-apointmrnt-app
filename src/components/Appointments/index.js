import {Component} from 'react'

import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isStarButtonClicked: false,
  }

  onUpdateTitle = event => {
    this.setState({title: event.target.value})
  }

  onUpdateDate = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: v4(),
      title,
      date,
      isStared: false,
    }
    if (title.length !== 0 && date.length !== 0) {
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onToggleIsStared = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStared: !eachItem.isStared}
        }
        return eachItem
      }),
    }))
  }

  getStarredList = () => {
    this.setState(prevState => ({
      isStarButtonClicked: !prevState.isStarButtonClicked,
    }))
  }

  renderAppointments = appointments =>
    appointments.map(eachItem => (
      <AppointmentItem
        appointmentItem={eachItem}
        key={eachItem.id}
        onToggleIsStared={this.onToggleIsStared}
      />
    ))

  render() {
    const {isStarButtonClicked, appointmentsList, title, date} = this.state
    const staredList = appointmentsList.filter(
      eachItem => eachItem.isStared === true,
    )
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="top-container">
            <div className="add-appointment-container">
              <h1 className="heading">Add Appointment </h1>
              <form className="forms-container" onSubmit={this.addAppointment}>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  className="title-bar"
                  placeholder="Title"
                  onChange={this.onUpdateTitle}
                  value={title}
                />
                <label htmlFor="date-block" className="label">
                  DATE
                </label>
                <input
                  id="date-block"
                  className="title-bar"
                  type="date"
                  onChange={this.onUpdateDate}
                  value={date}
                />
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="main-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="bottom-container">
            <div className="appointments-heading-container">
              <h1 className="bottom-heading">Appointments</h1>
              <button
                className="stared-btn"
                type="button"
                onClick={this.getStarredList}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-container">
              {isStarButtonClicked
                ? this.renderAppointments(staredList)
                : this.renderAppointments(appointmentsList)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
