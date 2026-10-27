import { getAllUser, update, deleteUser, getUserById, create } from "../services/CRUDService.js";

export const getHomePage = async (req, res) => {
    try {
        let results = await getAllUser();
        return res.render('home.ejs', { listUser: results });
    } catch (error) {
        console.log(">>> Error getHomePage: ", error);
        return res.send("Lỗi tải trang chủ: " + error.message);
    }
};

export const getClean = async (req, res) => {
    try {
        const users = await getAllUser();
        console.log('>>>>>>> user = ', users);
    } catch (err) {
        console.log('>>>>>>> err =', err);
    }
    return res.send('Hello');
};

export const postCreateUser = async (req, res) => {
    let { email, name, city } = req.body;
    try {
        const result = await create(email, name, city);
        console.log('>>>>>>>>>>> Result: ', result);
        return res.redirect('/');
    } catch (err) {
        console.log('>>>>>>> err =', err);
        return res.send('Có lỗi xảy ra: ' + err.message);
    }
};

export const updatePage = async (req, res) => {
    let { email, name, city } = req.body;
    let { id } = req.params;
    try {
        const result = await update(email, name, city, id);
        console.log('>>>>>>>>>>> Result: ', result);
        return res.redirect('/');
    } catch (err) {
        console.log('>>>>>>> err =', err);
        return res.send('Có lỗi xảy ra: ' + err.message);
    }
};

export const getEditPage = async (req, res) => {
    let { id } = req.params;
    try {
        const dataUser = await getUserById(id);
        return res.render('edit.ejs', { dataUser });
    } catch (err) {
        return res.send('Lỗi tải trang edit: ' + err.message);
    }
};

export const deletePage = async (req, res) => {
    let { id } = req.params;
    try {
        await deleteUser(id);
        return res.redirect('/');
    } catch (err) {
        return res.send(`Đã xảy ra lỗi: ${err}`);
    }
};

export const getCreatePage = async (req, res) => {
    res.render('create.ejs');
};
