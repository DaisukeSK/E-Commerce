import pkg from 'pg';
const { Pool } = pkg;

const host2 = 'otto.db.elephantsql.com';
const user2 = 'xndmjiao';
const password2 = 'Sbx1LLihVeA9kNP4HAhCW12zmwF9RApF';
const database2 = 'xndmjiao';
const port_db2 = 5432;

const pool2 = new Pool({
  user: user2,
  host: host2,
  password: password2,
  database: database2,
  port: port_db2,
});

export default pool2;
