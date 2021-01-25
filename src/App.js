import React from 'react'
//import logo from './logo.svg';
import MySql from './MySql';

function App() {
    
  return (
    <div className="App">
      <header className="App-header">
        <img src="./assets/logo.svg" className="App-logo" alt="logo" />
        <h2>React-js + Electron + Database</h2>
        <MySql />
      </header>
    </div>
  );
}

export default App;
