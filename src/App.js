import React, { Component } from 'react';
import Todos from './components/Todos'
import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Gym',
        completed: false
      },
      {
        id: 2,
        title: 'Dinner',
        completed: false
      },
      {
        id: 3,
        title: 'Meeting',
        completed: false
      }
    ]
  }
// Toggle complete
  markComplete = (id) => {
    console.log('From ', id);
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    })
  })
}

delTodo = (id) => {
  this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]});
}
  render() {
    return (
      <div className="App">
        <Todos todos={this.state.todos} markComplete={this.markComplete}
        delTodo= {this.delTodo}/>
        <h1>App</h1>
      </div>
    );
  }
}

export default App;
