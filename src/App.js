import React from 'react'
//import logo from './logo.svg';
import mysql from 'mysql';

function App() {
  
  // set connection variable
  const [conn,setConn] = React.useState(undefined); 

  // function connection mysql remote
  const connection = () => {
    let c = mysql.createConnection({    
      //host     : '888.88.88.88', //:3306
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'databasename'
    });
    c.connect((err) => {
      // in case of error
      if(err){
          alert( err.code );
          return console.log(err.code, err.fatal, err.stack);
      }
      return console.log('Connection successfully established');
    });
    setConn(c);
  }

  // function query/search
  const query = () => {
    let sql = 'SELECT `name`,`id` FROM `tablename` where id > 0  limit 0,50 ';
    conn.query(sql, function (error, results, fields) {
      if (error) {
        alert(error.code);
        console.log(error.code);
      }
      else {
        alert(results);
        console.log(results);
        if(results.length)
           alert(results[0].id + results[0].name);
      }
     });
     
     // Close the connection
     connection.end(function(){
        // The connection has been closed
     });
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src="./assets/logo.svg" className="App-logo" alt="logo" />
        <h2>React-js + Electron + Database</h2>
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
