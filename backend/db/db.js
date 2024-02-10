import pkg from 'pg';
const { Pool } = pkg;

// const host = 'localhost';
// const user = 'postgres';
// const password = '1226';
// const database = 'ecommerce';
// const port_db = 5432;

const host = 'otto.db.elephantsql.com';
const user = 'xndmjiao';
const password = 'Sbx1LLihVeA9kNP4HAhCW12zmwF9RApF';
const database = 'xndmjiao';
const port_db = 5432;

const pool = new Pool({
  user: user,
  host: host,
  password: password,
  database: database,
  port: port_db,
  max: 4
});

// const pool = new Pool({
//   connectionString: 'postgres://xndmjiao:Sbx1LLihVeA9kNP4HAhCW12zmwF9RApF@otto.db.elephantsql.com/xndmjiao',
//   max: 3
// });

export default pool;