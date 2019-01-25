import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from './action/actions.js'

import AddTodo from './component/AddTodo.jsx'
import TodoList from './component/TodoList.jsx'

class App extends Component {
  render() {
    const { dispatch, visibleTodos } = this.props

    return (
      <div>
        <AddTodo onAddClick={text => dispatch(addTodo(text))} />
        <TodoList todos={visibleTodos} />
      </div>
    )
  }
}
function select(state) {
  return {
    visibleTodos: state.todos
  }
}
export default connect(select)(App);