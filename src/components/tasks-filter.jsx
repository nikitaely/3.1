import React from 'react'
import './tasks-filter.css'
import PropTypes from 'prop-types'

function TasksFilter({ setFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className="selected"
          onClick={() => {
            setFilter('all')
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            setFilter('active')
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            setFilter('completed')
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.defaultProps = {
  setFilter: () => {},
}

TasksFilter.propTypes = {
  setFilter: PropTypes.func,
}

export default TasksFilter
