import { readFileSync, readSync } from 'fs';
import mysql from 'mysql2';
// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '',
//   port: '3306',
//   database: 'petpal',
// });

const db = mysql.createConnection({
  host: 'pet-pal-jayswalstuti3-292f.a.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_Ikm5j1UZjOoLYG8q4O5',
  port: 22400,
  database: 'defaultdb',
  ssl:{ca:readFileSync('./ca.pem').toString(),rejectUnauthorized:true,}
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + db.threadId);
});

export default db;
