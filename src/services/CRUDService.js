import connection from "../config/database.js";

const getAllUser = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM Persons`);
    return results;
}

const getUserById = async (id) => {
    let [results, fields] = await connection.query(
        `SELECT * FROM Persons WHERE id = ?`, [id]
    );

    //Check result nếu result lớn hơn 0 thì lấy phần tử đầu tiên của nó nếu không thì cho rỗng
    return results && results.length > 0 ? results[0] : {};
}

const updateUser = async (id, name, email, city) => {
    let [results, fields] = await connection.query(
        `UPDATE Persons SET name = ?, email = ?, city = ? WHERE id = ?`,
        [name, email, city, id]
    );
    return results;
}

export {
    getAllUser,
    getUserById,
    updateUser
}