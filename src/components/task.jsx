import React, { Component } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRunning: true,
      elapsedTime: 0,
    }
    this.timer = setInterval(this.updateElapsedTime, 1000)
    this.startTime = props.time
  }

  componentDidMount() {
    // Слушаем изменения видимости страницы
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  componentWillUnmount() {
    // Очищаем таймер и удаляем слушатель событий при размонтировании компонента
    if (this.timer) {
      clearInterval(this.timer)
    }
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange,
    )
  }

  handleStartStop = () => {
    this.setState((prevState) => {
      const isRunning = !prevState.isRunning
      if (isRunning) {
        // Запускаем таймер
        this.startTime = Date.now() - this.state.elapsedTime // Сохраняем время начала
        this.timer = setInterval(this.updateElapsedTime, 1000)
      } else {
        // Останавливаем таймер
        clearInterval(this.timer)
      }
      return { isRunning }
    })
  }

  handleReset = () => {
    // Сбрасываем время
    this.setState({ elapsedTime: 0 })
    this.startTime = Date.now() // Перезаписываем начальное время
  }

  updateElapsedTime = () => {
    this.setState({ elapsedTime: Date.now() - this.startTime })
  }

  handleVisibilityChange = () => {
    if (document.hidden) {
      // Если вкладка скрыта, сохраняем начальное время
      this.startTime = Date.now() - this.state.elapsedTime
    } else {
      // Если вкладка активна, продолжаем отсчет
      this.startTime = Date.now() - this.state.elapsedTime
    }
  }

  render() {
    const { description, onToggleDone, onDeleted, done, time } = this.props
    const { isRunning, elapsedTime } = this.state
    const classNames = done ? 'completed' : ''
    const inputId = `task-toggle-${description.replace(/\s+/g, '-').toLowerCase()}`

    return (
      <li className={classNames}>
        <div className="view">
          <input
            id={inputId}
            className="toggle"
            type="checkbox"
            onChange={onToggleDone}
            checked={done}
            aria-label="Mark task as completed"
          />
          <label htmlFor={inputId}>
            <span
              className="description"
              role="button"
              tabIndex={0}
              onClick={onToggleDone}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && onToggleDone()
              }
            >
              {description}
            </span>
            <span className="created">
              created {formatDistanceToNowStrict(time)} ago
            </span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            aria-label="Edit task"
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeleted}
            aria-label="Delete task"
          />

          <div className="timer">
            <span>
              {formatDistanceToNowStrict(new Date(Date.now() - elapsedTime))}{' '}
            </span>
            <button
              type="button"
              onClick={this.handleStartStop}
              className={isRunning ? 'icon icon-pause' : 'icon icon-play'}
            ></button>
          </div>
        </div>
      </li>
    )
  }
}

Task.defaultProps = {
  description: '...',
  onToggleDone: () => {},
  onDeleted: () => {},
  done: false,
  time: Date.now(),
}

Task.propTypes = {
  description: PropTypes.string,
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  done: PropTypes.bool,
  time: PropTypes.instanceOf(Date),
}

export default Task
