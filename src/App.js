import React, {useEffect, useState} from 'react'
//import logo from './logo.svg';
import MySql from './MySql';
import { ipcRenderer } from 'electron';

function App() {

  const [version, setVersion] = useState('');

  const getVersion = () => {
    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      setVersion(arg.version);
    });
  }

  useEffect(() => {
    getVersion();
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src="./assets/logo.svg" className="App-logo" alt="logo" />
        <h2>React-js + Electron + Database</h2>
        <div>{version}</div>
        <MySql />
      </header>
    </div>
  );
}

export default App;
