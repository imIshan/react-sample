import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Todos from './components/Todos'
import Header from './components/layout/header'
import './App.css';
import { AddTodo } from './components/AddTodo';
import uuid from 'uuid';
import About from './components/pages/About';

class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Gym',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Dinner',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Meeting',
        completed: false
      }
    ]
  }
// Toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    })
  })
}
// Delete Todo
delTodo = (id) => {
  this.setState({
    todos: [...this.state.todos.filter(todo => todo.id !== id)]
  });
}

// Add Todo
addTodo = (title) => {
  const newTodo = {
    id: uuid.v4(),
    title,
    completed: false
  }
  this.setState({
    todos: [...this.state.todos, newTodo]
  })
}

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render= { props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                delTodo= {this.delTodo} />
                </React.Fragment>
              )}>
           </Route>
           <Route path="/about" component={About} />  
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
