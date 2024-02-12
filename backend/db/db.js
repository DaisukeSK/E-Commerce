import pkg from 'pg';
const { Pool } = pkg;

const host = 'localhost';
const user = 'postgres';
const password = '1226';
const database = 'ecommerce';
const port_db = 5432;

// const host = 'otto.db.elephantsql.com';
// const user = 'xndmjiao';
// const password = 'Sbx1LLihVeA9kNP4HAhCW12zmwF9RApF';
// const database = 'xndmjiao';
// const port_db = 5432;

// const pool = new Pool({
//   user: user,
//   host: host,
//   password: password,
//   database: database,
//   port: port_db,
//   max: 4
// });


// const add='?sslmode=no-verify'
const add='?ssl=true'
const connectionString=`postgres://ecommerce_bbpe_user:2zJD6N4T50Q6z35sdPLmrecfminNiVlp@dpg-cn48htmn7f5s73921n8g-a.oregon-postgres.render.com/ecommerce_bbpe${add}`
const pool = new Pool({
  connectionString: connectionString,
  max: 3
});

export default pool;