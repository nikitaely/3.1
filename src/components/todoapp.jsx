import React, { Component } from 'react'
import Header from './header'
import TaskList from './task-list'
import Footer from './footer'
import './todoapp.css'

export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todoData: [
        this.createItem('first'),
        this.createItem('two'),
        this.createItem('three'),
      ],
      filter: 'all',
    }

    this.maxId = 1 // Инициализация переменной в конструкторе
  }

  addTask = (label) => {
    this.setState(({ todoData }) => ({
      todoData: [...todoData, this.createItem(label)],
    }))
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => el.id !== id),
    }))
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ]
      return { todoData: newArray }
    })
  }

  getFilteredTasks = () => {
    const { todoData, filter } = this.state

    switch (filter) {
      case 'active':
        return todoData.filter((task) => !task.done)
      case 'completed':
        return todoData.filter((task) => task.done)
      default:
        return todoData
    }
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((task) => !task.done),
    }))
  }

  createItem(description) {
    this.maxId += 1
    return {
      description,
      done: false,
      id: this.maxId,
      time: Date.now(),
    }
  }

  render() {
    const { todoData } = this.state // Деструктуризация `this.state`
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <TaskList
          todos={this.getFilteredTasks()}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
        />
        <Footer
          todoCount={todoCount}
          setFilter={this.setFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    )
  }
}
