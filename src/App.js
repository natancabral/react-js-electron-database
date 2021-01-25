import React from 'react'
//import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./assets/logo.svg" className="App-logo" alt="logo" />
        <p>
          Click to connect database
        </p>
    
        <button onClick={()=>connection()}>Connection MYSQL</button>
        <button onClick={()=>query()}>Query</button>

      </header>
    </div>
  );
}

export default App;
