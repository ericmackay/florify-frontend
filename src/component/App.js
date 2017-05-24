import React, { Component } from 'react';
import './App.css';

// TODO: Import menu back and render it...
// import Menu from './modals/Menu';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
  }


  render() {
    return (
      <div className="App">

        {this.props.children}
      </div>
    );
  }
}

export default App;
