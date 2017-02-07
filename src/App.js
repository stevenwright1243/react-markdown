import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MarkdownEditor from './Markdown';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>React.js Markdown Editor</h1>
        </div>
        <MarkdownEditor />
      </div>
    );
  }
}

export default App;
