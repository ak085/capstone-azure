const pool = require('../services/db');

var productModel = {

    selectAllProducts: (callback) => {
        const SQLSTATEMENT = `SELECT * FROM fashion_product;`;
        pool.query(SQLSTATEMENT, callback);
    },

    getProductByIdYearSort: (data, callback) => {
        const SQLSTATEMENT = `SELECT * from fashion_product WHERE catid = ? and YEAR(date) >= YEAR(CURDATE()) ORDER BY YEAR(date) ASC, date ASC;`;
        const VALUES = [data.searchkey];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

    getProductBySsYearSort: (data, callback) => {
        const SQLSTATEMENT = `SELECT * from fashion_product WHERE name like ? and YEAR(date) >= YEAR(CURDATE()) ORDER BY YEAR(date) ASC, date ASC;`;
        const VALUES = [data.searchkey];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

    insertNewProduct: (data, callback) => 
    {
        const SQLSTATMENT = `
            INSERT INTO fashion_product(name, description, brand, imageurl, catid)
            VALUES (?,?,?,?,?);
            `;
        const VALUES = [data.name, data.description, data.brand, data.imageurl, data.catid];
    
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    getProductBySearchColumn: (data, callback) => {
        const SQLSTATEMENT = `SELECT * FROM fashion_product WHERE \`${data.searchCol}\` = ?;`;
        const VALUES = [data.searchVal];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

    deleteProductByName : (data, callback) => {
        const SQLSTATMENT = `
            DELETE FROM fashion_product
            WHERE name = ?
            `;
        const VALUES = [data.name];

        pool.query(SQLSTATMENT, VALUES, callback);        
    },

    deleteProductByBrand : (data, callback) => {
        const SQLSTATMENT = `
            DELETE FROM fashion_product
            WHERE brand = ?
            `;
        const VALUES = [data.brand];

        pool.query(SQLSTATMENT, VALUES, callback);        
    },

    deleteProductById : (data, callback) => {
        const SQLSTATMENT = `
            DELETE FROM fashion_product
            WHERE productid = ?
            `;
        const VALUES = [data.productid];

        pool.query(SQLSTATMENT, VALUES, callback);        
    },

    updateProductById : (data, callback) => {
        const SQLSTATMENT = `
            UPDATE fashion_product 
            SET name=?, description=?, 
            brand=?, imageurl=?, catid=? 
            WHERE productid=?;
            `;
        const VALUES = [data.name, data.description, data.brand, data.imageurl, data.catid, data.productid];

        pool.query(SQLSTATMENT, VALUES, callback);
    }
}

module.exports = productModel;