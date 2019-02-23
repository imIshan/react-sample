import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Todos from './components/Todos'
import Header from './components/layout/header'
import { AddTodo } from './components/AddTodo';
import About from './components/pages/About';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(result => this.setState({ todos: result.data}));
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
  axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
  .then(result => this.setState({
    todos: [...this.state.todos.filter(todo => todo.id !== id)]
  }));
}

// Add Todo
addTodo = (title) => {
  axios.post('https://jsonplaceholder.typicode.com/todos/', {
    title,
    completed: false
  }).then(result => this.setState({todos: [...this.state.todos, result.data]}));
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
