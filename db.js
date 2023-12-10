import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'sql5.freemysqlhosting.net',
  user: 'sql5668092',
  password: 'GQE5XmGPIr',
  port: '3306',
  database: 'sql5668092',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + db.threadId);
});

export default db;
