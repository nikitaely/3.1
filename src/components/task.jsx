import React from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import PropTypes from 'prop-types'

function Task({ description, onToggleDone, onDeleted, done, time }) {
  const classNames = done ? 'completed' : ''
  const inputId = `task-toggle-${description.replace(/\s+/g, '-').toLowerCase()}` // Создаем уникальный ID

  return (
    <li className={classNames}>
      <div className="view">
        <input
          id={inputId} // Привязка ID
          className="toggle"
          type="checkbox"
          onChange={onToggleDone}
          checked={done}
          aria-label="Mark task as completed"
        />
        <label htmlFor={inputId}>
          {' '}
          {/* Привязка htmlFor */}
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
      </div>
    </li>
  )
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
