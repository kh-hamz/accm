const mysql = require('mysql2');

const connect_to_db = () => {
    let con = mysql.createConnection({
        multipleStatements:true,
        host: "localhost",
        user: "root",
        password: "incorrecTpa$$0", 
        database: "meat_masters"
    });
    return con;
}

const connect_to_db2 = () => {
    let con = mysql.createConnection({
        multipleStatements:true,
        host: "localhost",
        user: "Employee",
        password: "new123",
        database: "meat_masters"
    });
    return con;
}

const connect_to_db3 = () => {
    let con = mysql.createConnection({
        multipleStatements:true,
        host: "localhost",
        user: "Department",
        password: "new123",
        database: "meat_masters"
    });
    return con;
}
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);
  });


module.exports = {connect_to_db,connect_to_db2,connect_to_db3}
