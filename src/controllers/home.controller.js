import connection from "../config/database.js";
import {getAllUser, getUserById, updateUser} from "../services/CRUDService.js"
export const getHomePage = async(req, res) => {
    try {
        let results = await getAllUser();
        return res.render('home.ejs', { listUser: results });
    } catch (error) {
        console.log(">>> Error getHomePage: ", error);
        return res.send("Lỗi tải trang chủ: " + error.message);
    }
    
};

export const getClean = async (req, res) => {
    let user = [];
    try {
        const [results, fields] = await connection.query(
            'select * from Persons p'
        );

        user = results;
        console.log('>>>>>>> user = ', user);
    } catch (err) {
        console.log('>>>>>>> err =', err);
    }
    return res.send('Hello');
};

export const postCreateUser = async (req, res) => {


    let { email, name, city } = req.body;
    
    try {
        // Vì connection cấu hình bằng mysql2/promise nên dùng await
        const [results, fields] = await connection.query(
            `INSERT INTO Persons (email, name, city) VALUES (?, ?, ?)`,
            [email, name, city]
        ); 
        console.log('>>>>>>>>>>> Result: ', results);
        
        return res.send('Đã thêm 1 user thành công!');
    } catch (err) {
        console.log('>>>>>>> err =', err);
        return res.send('Có lỗi xảy ra: ' + err.message);
    }
};

export const getUpdatePage = async(req, res) => {
    try{
        const userId = req.params.id;
        let user = await getUserById(userId);
        return res.render('edit.ejs', { dataUser: user });
    } catch(error){
        console.log(`>>>>> Error getUpdatePage: `, error);
        return res.send(`Lỗi tải trang update: ${error}`);
    }
}

export const postHandleUpdateUser = async(req, res) => {
    try{
        let { id, name, email, city } = req.body;
        await updateUser(id, name, email, city);
        return res.redirect('/');
    } catch(error){
        console.log(`>>>>> Error postHandleUpdateUser: `, error);
        return res.send(`Lỗi cập nhật user: ${error}`);
    }
}

export const getCreatePage = async(req, res) => {
    res.render('create.ejs')
}

