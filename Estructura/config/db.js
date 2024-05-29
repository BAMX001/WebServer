var mysql = require('mysql');

const db1 = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'userregistration'
});

const db2 = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'sonorafinance'
});

db1.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Conectado a base de datos de usuarios');
  });

  db2.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Conectado a base de datos sonora');
  });
  
  module.exports = { db1, db2 };