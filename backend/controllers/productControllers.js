import { connect } from '../server.js';

export const getAllCategories = async (req, res) => {

    try {
        const categories = await connect.query('select * from categories');
        res.status(200).json(categories.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const getAllProducts = async (req, res) => {

    try {
        const products = await connect.query('select * from products inner join categories on products.category_id=categories.category_id');
        res.status(200).json(products.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}