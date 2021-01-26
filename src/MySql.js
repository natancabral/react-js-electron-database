import React from "react";
import mysql from "mysql";

function MySql() {

  // https://github.com/mysqljs/mysql

  // set connection variable
  const [conn, setConn] = React.useState(undefined);
  const dataConnection = {
      //host     : '888.88.88.88', //:3306
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "databasename",
  }
  const [list,setList] = React.useState([]);
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
    let sql = "SELECT `name`,`id` FROM `tablename` where id > ?  limit 0,50 ";
    //let value = connection.escape(value);
    //let id = connection.escapeId(id);
    conn.query(
        {
          sql: sql,
          timeout: 40 * 1000, // 40s
        },
        [0], // values to replace ?
        function (err, results, fields) {
      if (err) {
        alert(err.code);
        console.log(err.code);
      } else {
        alert(results);
        console.log(results);
        if (results.length) {
            setList(results);
            alert(results[0].id + results[0].name);
        }
      }
    });

    // Close the connection
    conn.end(function () {
      // The connection has been closed
    });
  };

  const queryPost = () => {
    var post  = {id: 1, title: 'Hello MySQL'};
    var query = conn.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
      if (error) throw error;
      // Neat!
    });
    console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
  }

  return (
    <React.Fragment>
      <p>Click to connect database</p>
      <button onClick={() => connection()}>Connection MYSQL</button>
      <button onClick={() => query()}>Query</button>
      <button onClick={() => queryPost()}>Query with Post</button>
      <div style={{fontSize:'11px', textAlign:'left'}}>
        <ul>
            <li>Host: {host}</li>
            <li>User: {user}</li>
            <li>Password: {password}</li>
            <li>Database: {database}</li>
        </ul>
      </div>
      <div style={{fontSize:'11px', textAlign:'left'}}>
          <ul>
              {list.map((dat,idx) => {
                  return (
                      <li key={idx}> {dat.id} {dat.name} </li>
                  )
              })}
          </ul>
      </div>
    </React.Fragment>
  );
}

export default MySql;
