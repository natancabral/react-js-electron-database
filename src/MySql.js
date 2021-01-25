import React from "react";
import mysql from "mysql";

function MySql() {

  // set connection variable
  const [conn, setConn] = React.useState(undefined);
  const dataConnection = {
      //host     : '888.88.88.88', //:3306
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "databasename",
  }
  const {host, user, password, database} = dataConnection; 

  // function connection mysql remote
  const connection = () => {
    let c = mysql.createConnection(dataConnection);
    c.connect((err) => {
      // in case of error
      if (err) {
        alert(err.code);
        return console.log(err.code, err.fatal, err.stack);
      }
      return console.log("Connection successfully established");
    });
    setConn(c);
  };

  // function query/search
  const query = () => {
    let sql = "SELECT `name`,`id` FROM `tablename` where id > 0  limit 0,50 ";
    conn.query(sql, function (err, results, fields) {
      if (err) {
        alert(err.code);
        console.log(err.code);
      } else {
        alert(results);
        console.log(results);
        if (results.length) alert(results[0].id + results[0].name);
      }
    });

    // Close the connection
    connection.end(function () {
      // The connection has been closed
    });
  };

  return (
    <React.Fragment>
      <p>Click to connect database</p>
      <button onClick={() => connection()}>Connection MYSQL</button>
      <button onClick={() => query()}>Query</button>
      <div style={{fontSize:'11px', textAlign:'left'}}>
        <ul>
            <li>Host: {host}</li>
            <li>User: {user}</li>
            <li>Password: {password}</li>
            <li>Database: {database}</li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default MySql;
