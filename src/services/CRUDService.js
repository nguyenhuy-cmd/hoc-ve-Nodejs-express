import connection from "../config/database.js";
const getAllUser = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM Persons`);
    return results;
}
export {
    getAllUser
}