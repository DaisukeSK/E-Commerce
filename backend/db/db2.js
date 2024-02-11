import pkg from 'pg';
const { Pool } = pkg;

// const host2 = 'otto.db.elephantsql.com';
// const user2 = 'xndmjiao';
// const password2 = 'Sbx1LLihVeA9kNP4HAhCW12zmwF9RApF';
// const database2 = 'xndmjiao';
// const port_db2 = 5432;

const host2 = 'dpg-cn48htmn7f5s73921n8g-a';
const user2 = 'ecommerce_bbpe_user';
const password2 = '2zJD6N4T50Q6z35sdPLmrecfminNiVlp';
const database2 = 'ecommerce_bbpe';
const port_db2 = 5432;

// const pool2 = new Pool({
//   user: user2,
//   host: host2,
//   password: password2,
//   database: database2,
//   port: port_db2,
// });

const pool2 = new Pool({
  connectionString: 'postgres://ecommerce_bbpe_user:2zJD6N4T50Q6z35sdPLmrecfminNiVlp@dpg-cn48htmn7f5s73921n8g-a.oregon-postgres.render.com/ecommerce_bbpe',
  max: 3
});

export default pool2;
