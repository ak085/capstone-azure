const model = require('../models/categoryModel');

var categoryController = 
{
    readAllCategory: (req, res, next) =>
    {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllCategory:", error);
                res.status(500).json(error);
            }  
            else 
            {
                res.status(200).json(results);
            }
        }

        model.selectAllCategory(callback);
    },

    addNewCategory: (req, res, next) =>
    {
        // add on advanced feature to check if name and description is valid before querying
        const name_exist = (typeof req.body.name !== "undefined");
        const description_exist = (typeof req.body.description !== "undefined");
        const all_info_exist = name_exist && description_exist;

        if(all_info_exist)
        {
            const data = {
                name: req.body.name,
                description: req.body.description
            }

            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error addNewCategory:", error);
                    res.status(500).json(error);
                } else {
                    const return_msg = {message: "New fashion category created successfully." };
                    res.status(201).json(return_msg);
                }
            }

            model.insertNewCategory(data, callback);
        }
        else
        {
            res.status(500).json({ message: "Name or description is not provided as required by this web service."});	
        }
    },

    updateCategoryById: (req, res, next) =>
    {
        let inputCatID = parseInt(req.params.catid);
        
        if(isNaN(inputCatID))
        {
            res.status(500).json({ message: "Category ID provided for update is not an integer"});
        }
        else
        {
            const catname_exist = (typeof req.body.name !== "undefined");
            const catdescription_exist = (typeof req.body.description !== "undefined");
            const all_info_exist = catname_exist && catdescription_exist;
            
            if(all_info_exist)
            {
                const data = {
                    catname: req.body.name,
                    catdescription: req.body.description,
                    catid: req.params.catid
                }			

                const callback = (error, results, fields) => 
                {
                    if (error)
                    {
                        console.error("Error updateCategoryById:", error);
                        res.status(500).json(error);
                    } 
                    else 
                    {
                        if(results.affectedRows == 0)
                        {
                            res.status(404).json({
                                message: "Category not found for update based on catid provided"
                            });
                        }
                        else
                        {
                            // Success, send http status 204 for delete or put methods
                            res.status(204).send();
                        }
                    }
                }
                
                model.updateCategoryById(data, callback);	
            }
            else
            {
                res.status(500).json({ message: "Json keys, name or description is not provided as required by this web service."});	
            }
            
        }
    }    

}

module.exports = categoryController;