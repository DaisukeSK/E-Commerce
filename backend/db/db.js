import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();


// const pool = new Pool({
//   user: process.env.user2,
//   host: process.env.host2,
//   password: process.env.password2,
//   database: process.env.database2,
//   port: process.env.port_db2,
//   max: 4
// });

const pool = new Pool({
  user: 'xndmjiao',
  host: 'otto.db.elephantsql.com',
  password: 'Sbx1LLihVeA9kNP4HAhCW12zmwF9RApF',
  database: 'xndmjiao',
  port: 5432,
  max: 4
});


const addition1='?ssl=true'
const addition2='?sslmode=no-verify'

const connectionString=process.env.connectionString
// const connectionString='postgres://ecommerce_bbpe_user:2zJD6N4T50Q6z35sdPLmrecfminNiVlp@dpg-cn48htmn7f5s73921n8g-a.oregon-postgres.render.com/ecommerce_bbpe'

// const pool = new Pool({
//   connectionString: `${connectionString}${addition1}`,
//   max: 3
// });

export default pool;