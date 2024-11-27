import React from 'react'
import PropTypes from 'prop-types'
import TasksFilter from './tasks-filter'
import './footer.css'

function Footer({ todoCount, setFilter, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter setFilter={setFilter} />
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  todoCount: 0,
  setFilter: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  todoCount: PropTypes.number,
  setFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
}

export default Footer
