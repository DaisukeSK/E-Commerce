import { connect } from '../server.js';

export const order = async (req, res) => {

    try {
        const cart = await connect.query(
            'delete from shopping_cart where user_id=$1',
            [req.body.user_id]
            );
        res.status(200).json(cart.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const removeFromCart = async (req, res) => {

    try {
        const cart = await connect.query(
            'delete from shopping_cart where user_id=$1 and product_id=$2',
            [req.body.user_id, req.body.product_id]
            );
        res.status(200).json(cart.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getCart = async (req, res) => {

    if(req.body.user_id){

        try {
            const cart = await connect.query(
                'select * from shopping_cart inner join products on shopping_cart.product_id=products.product_id where user_id=$1',
                [req.body.user_id]
                );
            res.status(200).json(cart.rows)
    
        } catch (err) {
            res.status(500).send(err.message);
        }
    }else{
        res.status(200).send('cart no id')
    }

}

export const addToCart = async (req, res) => {
    
    try {
        const select = await connect.query(
            'select * from shopping_cart where user_id=$1 and product_id=$2',
            [req.body.user_id, req.body.product_id]
            );

        if(!select.rows.length){
            await connect.query(
                'insert into shopping_cart (user_id,product_id,product_quantity) values ($1,$2,$3)',
                [req.body.user_id, req.body.product_id, req.body.quantity]
                );
        }else{
            const newQuantity=+req.body.quantity+select.rows[0].product_quantity
            await connect.query(
                'update shopping_cart set product_quantity=$1 where shopping_cart_id=$2',
                [newQuantity, select.rows[0].shopping_cart_id]
                );
        }

        const cart3 = await connect.query(
            'select * from shopping_cart inner join products on shopping_cart.product_id=products.product_id where user_id=$1',
            [req.body.user_id]
            );
        res.status(200).json(cart3.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}