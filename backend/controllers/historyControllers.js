import { connect } from '../server.js';

export const add = async (req, res) => {

    // const date=new Date().toLocaleString('en-US', {
    //       timeZone: 'America/Vancouver',
    //     });
    const date=new Date().toLocaleString();

    let str=''

    req.body.state.map((product,key)=>{
        str+=`${key==0?'':','}(${product.user_id},${product.product_id},${product.product_quantity},'${date}')`
    })

    try {
        await connect.query('set datestyle = mdy;');
        const history = await connect.query(`insert into history (user_id, product_id, product_quantity, shopping_date) values ${str}`);
        res.status(200).json(history.rows)
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export const get = async (req, res) => {
      
    try {
        const history = await connect.query(
            'select * from history inner join products on history.product_id=products.product_id where user_id=$1 order by history.history_id DESC',
            [req.body.user_id]
            );
        res.status(200).json(history.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}