import { connect } from '../server.js';

export const getFavorite = async (req, res) => {

    try {
        const fav = await connect.query(
            'select product_id from favorite where user_id=$1',
            [req.body.userId]
            );
        res.status(200).json(fav.rows.map(fav=>fav.product_id))

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const addToFavorite = async (req, res) => {
    
    try {
        const fav = await connect.query(
            'insert into favorite (user_id, product_id) values ($1,$2) returning *',
            [req.body.user_id,req.body.product_id]
            );
        res.status(200).json(fav.rows)
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const removeFromFavorite = async (req, res) => {
    
    try {
        const fav = await connect.query(
            'delete from favorite where user_id=$1 and product_id=$2',
            [req.body.user_id,req.body.product_id]
            );
        res.status(200).json(fav.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}