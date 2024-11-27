import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label } = this.state
    const { addTask } = this.props

    if (label.trim()) {
      addTask(label)
      this.setState({
        label: '',
      })
    }
  }

  onLabelChange = (e) => {
    const { value } = e.target
    this.setState({
      label: value,
    })
  }

  render() {
    const { label } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}
