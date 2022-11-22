import pg from 'pg';
const { promisify } = require('util');

const config = {
  host     : 'localhost',
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  port: 5432,
};

const pool = new pg.Pool(config);

pool.connect((err) => {
  if(err) {
    console.log('err:', err);
  }
});

pool.query = promisify(pool.query);

export default pool;
