import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();


// const pool = new Pool({
//   user: process.env.user1,
//   host: process.env.host1,
//   password: process.env.password1,
//   database: process.env.database1,
//   port: process.env.port_db1,
//   max: 4
// });


const addition1='?ssl=true'
const addition2='?sslmode=no-verify'

const connectionString=process.env.connectionString
// const connectionString='postgres://ecommerce_bbpe_user:2zJD6N4T50Q6z35sdPLmrecfminNiVlp@dpg-cn48htmn7f5s73921n8g-a.oregon-postgres.render.com/ecommerce_bbpe'

const pool = new Pool({
  connectionString: `${connectionString}${addition1}`,
  max: 3
});

export default pool;