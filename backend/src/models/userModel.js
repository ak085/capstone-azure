const pool = require('../services/db');

var userModel = {

    loginUser: (data, callback) => {
        const SQLSTATMENT = `SELECT * from user where email=? and password=?`;
        const VALUES = [data.email, data.password];

        pool.query(SQLSTATMENT, VALUES, callback);
    },

    checkEmailExist: (data, callback) => {
        const SQLSTATMENT = `SELECT * FROM user where email=?`;
        const VALUES = [data.email];

	    pool.query(SQLSTATMENT, VALUES, callback);
    },

    insertNewUser: (data, callback) => {
        const SQLSTATMENT = `
            INSERT INTO user(name, email, role, password)
            VALUES (?,?,?,?);
            `;
        const VALUES = [data.name, data.email, data.role, data.password];
    
        pool.query(SQLSTATMENT, VALUES, callback);
    },    

    getUserById: (data, callback) => {
        const SQLSTATMENT = `SELECT email, name, role FROM user WHERE userid=?;`;
        const VALUES = [data.userid];

        pool.query(SQLSTATMENT, VALUES, callback);
    },

    getUserByEmail: (data, callback) => {
        const SQLSTATMENT = `SELECT userid, name, role FROM user WHERE email=?;`;
        const VALUES = [data.email];

        pool.query(SQLSTATMENT, VALUES, callback);
    },

    getAllUsers: (callback) => {
        const SQLSTATMENT = `SELECT userid, email, name, role FROM user;`;
		pool.query(SQLSTATMENT, callback);
    },

    filterUsers : (data, callback) => {
        const SQLSTATMENT = `
            SELECT userid, email, name, role from user 
            WHERE name like ? and email like ? and role like ? and 
            userid BETWEEN ? AND ?;
            `;
        const VALUES = [data.name, data.email, data.role, data.useridLower, data.useridUpper];

        pool.query(SQLSTATMENT, VALUES, callback);
    },

    updateUser: (data, callback) => {
        let SQLSTATMENT;
        let VALUES;
        
        if (data.password) {
            // Update including password
            SQLSTATMENT = `
                UPDATE user 
                SET name = ?, email = ?, role = ?, password = ?
                WHERE userid = ?;
                `;
            VALUES = [data.name, data.email, data.role, data.password, data.userid];
        } else {
            // Update without password
            SQLSTATMENT = `
                UPDATE user 
                SET name = ?, email = ?, role = ?
                WHERE userid = ?;
                `;
            VALUES = [data.name, data.email, data.role, data.userid];
        }
        
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    deleteUser: (data, callback) => {
        const SQLSTATMENT = `DELETE FROM user WHERE userid = ?;`;
        const VALUES = [data.userid];
        
        pool.query(SQLSTATMENT, VALUES, callback);
    }
}

module.exports = userModel;