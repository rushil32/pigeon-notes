import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from "./logo.svg";
import Editor from './components/editor';
import Nav from './components/nav';
import "./App.css";


class App extends Component {
  state = {
    userData: {}
  };

  setUserData = (userData) => this.setState({ userData });
  
  getUserData = () => {
    axios.get('/api/users/current').then(
      res => this.setUserData(res.data.user),
      error => console.error,
    );
  }

  componentDidMount() { this.getUserData(); }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path ="/" component={(props) => (
              <Editor {...props} userData={this.state.userData} setUserData={this.setUserData} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
