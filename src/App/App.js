import React, { Component } from 'react';
import './App.scss';
import City from '../City/City';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Link, BrowserRouter } from 'react-router-dom';


class App extends Component{
  // constructor() {
  //   super()
  //   this.state = {
  //   }
  // };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <City ordinal='one'/>
          <City ordinal='two'/>
        </header>
      </div>
    );
  }
}

export default App;
