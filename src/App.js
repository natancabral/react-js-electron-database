import React from 'react'
//import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="./assets/logo.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
    
        <button onClick={()=>connection()}>Connection mySql</button>
        <button onClick={()=>query()}>Query</button>

      </header>
    </div>
  );
}

export default App;
