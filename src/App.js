import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
// import Auth from './Auth/Auth';
import Routes from './routes';
console.log("running version 14.086")

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
