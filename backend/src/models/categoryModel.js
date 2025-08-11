const pool = require('../services/db');

var categoryModel = {

    selectAllCategory: (callback) => 
    {
        const SQLSTATMENT = `SELECT * from category;`;
        pool.query(SQLSTATMENT, callback);
    },

    insertNewCategory: (data, callback) => 
    {
        const SQLSTATMENT = `
            INSERT INTO category(catname, catdescription) 
            VALUES (?,?);
            `;
        const VALUES = [data.name, data.description];
    
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    getCategoryById: (data, callback) => 
    {
        const SQLSTATMENT = `SELECT * from category WHERE catid = ?;`;
        const VALUES = [data.searchkey];
        pool.query(SQLSTATMENT, VALUES, callback);
    }, 

    getCategoryByName: (data, callback) => 
    {
        const SQLSTATMENT = `SELECT * from category WHERE catname like ?;`;
        const VALUES = [data.searchkey];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    updateCategoryById: (data, callback) => {
        const SQLSTATMENT = `UPDATE category SET catname = ?, catdescription = ? WHERE catid = ?;`;
        const VALUES = [data.catname, data.catdescription, data.catid];

        pool.query(SQLSTATMENT, VALUES, callback);
    }

}

module.exports = categoryModel;