import { connect } from '../server.js';

export const deleteAccount = async (req, res) => {

    try {
        connect.query('delete from favorite where user_id=$1',[req.body.userId]);
        connect.query('delete from shopping_cart where user_id=$1',[req.body.userId]);
        connect.query('delete from history where user_id=$1',[req.body.userId]);
        connect.query('delete from users where user_id=$1',[req.body.userId]);

        res.status(200).json('deleted')

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const changeUserName = async (req, res) => {

    try {
        const user = await connect.query(
            'select user_name from users where user_name=$1',
            [req.body.newName]
            );

        if(user.rows.length==0){

            const users2 = await connect.query(
                'update users set user_name=$1 where user_id=$2 returning *',
                [req.body.newName, req.body.userId]
                );
            res.status(200).json(users2.rows)

        }else{
            res.status(200).json('exist')
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const changePassword = async (req, res) => {

    try {
        const password = await connect.query(
            'select * from users where user_id=$1',
            [req.body.userId]
            );

        if(password.rows[0].password==req.body.currentPassword){
            const users2 = await connect.query(
                'update users set password=$1 where user_id=$2 returning *',
                [req.body.newPassword, req.body.userId]
                );
            res.status(200).json(users2.rows)

        }else{
            res.status(200).json('no match')
        }
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const signIn = async (req, res) => {

    try {
        const users = await connect.query(
            'select * from users where user_name=$1',
            [req.body.name]
            );
        
        const response=users.rows.length!==0 && users.rows[0].password==req.body.password?users.rows:'no match'
        res.status(200).json(response)

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const createAccount = async (req, res) => {
    
    try {

        const getUsers = await connect.query(
            'select * from users where user_name=$1',
            [req.body.name]
            );

        if(getUsers.rows.length==0){

            const date=new Date().toLocaleString()
            const users = await connect.query(
                'insert into users (user_name,password,created_date) values ($1, $2, $3) returning *',
                [req.body.name, req.body.password, date]
                );
            res.status(200).json(users.rows);
        }else{
            res.status(200).json('exist')
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
}