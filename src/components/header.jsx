import React from 'react'
import NewTaskForm from './new-task-form'

function Header({ addTask }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addTask={addTask} />
    </header>
  )
}

export default Header
