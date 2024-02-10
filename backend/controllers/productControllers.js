import pool from '../db/db.js';
import { connect } from '../server.js';

export const searchProducts = async (req, res) => {
    
    const keyeword=req.body.keyword.toUpperCase()
    const categoryId=req.body.categoryId=='all'?'':`where products.category_id=${req.body.categoryId}`

    try {
        const users = await pool.query(`select * from products inner join categories on products.category_id=categories.category_id ${categoryId}`);
        
        let returnArray=users.rows.filter(product=>
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
        const users = await connect.query('select * from categories');
        res.status(200).json(users.rows)

    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        // connect.release()
        // await connect.end()
      }
}

export const getAllProducts = async (req, res) => {

    try {
        const users = await connect.query('select * from products inner join categories on products.category_id=categories.category_id');
        // const users2 = await pool.query('select * from categories');
        res.status(200).json(users.rows)

    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        // connect.release()
        // await connect.end()
      }
}

export const addProductsToDB = async (req, res) => {

    let str1=''
    req.body.data1.map((product,key)=>{
        let urls=''
        product.images.map((url,key)=>{
            urls+=key==0?`'${url}'`:`,'${url}'`
        })

        product.id!==14 &&
        (str1+=`
            ${key==0?'':','}(
            '${product.title.replace("'","''")}',
            '${product.description.replace("'","''")}',
            ${product.price},
            array [${urls}],
            ${product.category_id}
        
            )`)
    })
    
    let str2=''
    req.body.data2.map((product,key)=>{

        let urls=''
        product.images.map((url,key)=>{
            urls+=key==0?`'${url}'`:`,'${url}'`
        })

        key!==8 && key!==13 && key!==15 && key!==24 &&
        (str2+=`
            ${key==0?'':','}(
            '${product.title.replace("'","''")}',
            '${product.description.replace("'","''")}',
            ${product.price},
            array [${urls}],
            ${product.category_id}
        
            )`)
    })


    let str3=''
    req.body.data3.map((product,key)=>{
        let urls=''
        product.images.map((url,key)=>{
            urls+=key==0?`'${url}'`:`,'${url}'`
        })

        str3+=`
            ${key==0?'':','}(
            '${product.title.replace("'","''")}',
            '${product.description.replace("'","''")}',
            ${product.price},
            array [${urls}],
            ${product.category_id}
        
            )`
    })

    let str4=''
    req.body.data4.map((product,key)=>{

        let urls=''
        product.images.map((url,key)=>{
            urls+=key==0?`'${url}'`:`,'${url}'`
        })
        
        str4+=`
            ${key==0?'':','}(
            '${product.title.replace("'","''")}',
            '${product.description.replace("'","''")}',
            ${product.price},
            array [${urls}],
            ${product.category_id}
        
            )`
    })

    try {
        const users = await pool.query(`insert into products (title,description,price,images,category_id) values ${str1},${str2},${str3},${str4}`);
        res.status(200).json(users.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const addCategoriesToDB = async (req, res) => {
    
    let str=''
    req.body.map((category,key)=>{
        str+=key==0?`('${category.replace("'","''")}')`:`,('${category.replace("'","''")}')`
    })

    try {
        const users = await pool.query(`insert into categories (category_name) values ${str} returning *`);
        res.status(200).json(users.rows)

    } catch (err) {
        res.status(500).send(err.message);
    }
}