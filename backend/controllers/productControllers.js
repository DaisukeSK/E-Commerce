import { connect } from '../server.js';

export const searchProducts = async (req, res) => {
    
    const keyeword=req.body.keyword.toUpperCase()
    const categoryId=req.body.categoryId=='all'?'':`where products.category_id=${req.body.categoryId}`

    try {
        const products = await connect.query(`select * from products inner join categories on products.category_id=categories.category_id ${categoryId}`);
        
        let returnArray=products.rows.filter(product=>
            product.category_name.toUpperCase().includes(keyeword) ||
            product.title.toUpperCase().includes(keyeword) ||
            product.description.toUpperCase().includes(keyeword) &&
            product
        )
        
        res.status(200).json(returnArray)

    } catch (err) {
        res.status(500).send(err.message);
    }
}

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