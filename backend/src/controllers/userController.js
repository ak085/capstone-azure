const model = require("../models/userModel");

var userController = {

    loginUser: (req, res, next) => 
    {
        const email_exist = (typeof req.body.email !== "undefined");
        const pw_exist = (typeof req.body.password !== "undefined");
        const all_info_exist = email_exist && pw_exist;

        if(all_info_exist)
        {
            const data = {
                email: req.body.email
            };

            const callback = (error, results, fields) => {
                if (error) 
                {
                    console.error("Error Login:", error);
                    res.status(500).json(error);
                }
                else 
                {
                    //no match   
                    if (results.length == 0) 
                    {
                        res.status(404).json({
                            message: "email provided is wrong",
                        });
                    }
                    else 
                    {  
                        //match email
                        res.locals.userid = results[0].userid; // saves userid from database in res.locals for use in jwt payload
                        res.locals.email = results[0].email;
                        res.locals.name = results[0].name;
                        res.locals.role = results[0].role;     // saves role from database in res.locals for use in jwt payload
                        res.locals.hash = results[0].password; // saves hash password from database for comparison in Bcrypt middleware
                        
                        //call next middleware to issue token
                        next(); 
                    }
                }
            };

            model.checkEmailExist(data, callback);
        }
        else
        {
            res.status(500).json({ message: "Email or password is not provided as required by this web service."});
        }
    },

    checkEmailExist: (req, res, next) => 
    {
        const data = {
            email: req.body.email
        };

        const callback = (error, results, fields) => {
            if (error) 
            {
                console.error("Error Login:", error);
                res.status(500).json(error);
            }
            else 
            {
                if (results.length == 0) 
                {
                    // Does not exist in database, email is unique
                    next(); 		
                }
                else 
                {  
                    // match existing email, it is not unique
                    res.status(404).json( {message: "email already exist in database. Retry using another email to register."} );
                }
            }
        };

        model.checkEmailExist(data, callback);
    },

    register : (req, res, next) =>
    {
        // check if request body contains necessary fields
        const name_exist = (typeof req.body.name !== "undefined");
        const email_exist = (typeof req.body.email !== "undefined");
        const pw_exist = (typeof req.body.password !== "undefined");
        const body_info_exist = name_exist && email_exist && pw_exist;
        
        if(body_info_exist)
        {
            const default_user_role = "Admin"; // "Member"
            const data = {
                name: req.body.name,
                email: req.body.email,
                role: default_user_role,
                password: res.locals.hash
            };
            
            res.locals.role = default_user_role;
            res.locals.message = 'User ' + data.name;

            const callback = (error, results, fields) => {
                if (error) 
                {
                    console.error("Error register for new user:", error);
                    res.status(500).json(error);
                    res.locals.role = '';
                    res.locals.message = '';
                } 
                else 
                {
                    console.log('Inserted row ID:', results.insertId);
                    res.locals.userid = results.insertId;
                    res.locals.message = res.locals.message + ' created successfully';
                    next(); //call next middleware to issue token
                }
            }

            model.insertNewUser(data, callback);
        }
        else
        {
            res.status(500).json({ message: "Name or email or password are not provided."});	
        }
    },    

    getUserById: (req, res, next) =>
    {
        const data = {
            userid: req.params.userid
        }

        const testUserId = req.params.userid;
        const userid_exist = (typeof testUserId !== "undefined");
        const userid_isNaN = isNaN(testUserId);
        const userid_ok = userid_exist && !userid_isNaN;

        if (userid_ok)
        {
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error getUserById:", error);
                    res.status(500).json(error);
                } else {
                    if(results.length == 0) 
                    {
                        res.status(404).json({
                            message: "User not found for specified userid"
                        });
                    }
                    else 
                    {
                        res.status(200).json(results[0]);
                    }
                }
            }
            model.getUserById(data, callback);
        }
        else
        {
            res.status(500).json({ message: "User id is not provided or not a number"});
        }
    },

    getUserByEmail: (req, res, next) =>
    {
        const data = {
            email: req.body.email
        };

        const testEmail = req.body.email;
        const email_exist = (typeof testEmail !== "undefined");

        if (email_exist)
        {
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error getUserByEmail:", error);
                    res.status(500).json(error);
                } else {
                    if(results.length == 0) 
                    {
                        res.status(404).json({
                            message: "User not found for specified email"
                        });
                    }
                    else 
                    { 
                        res.status(200).json(results[0]);
                    }
                }
            }
            model.getUserByEmail(data, callback);
        }
        else
        {
            res.status(500).json({ message: "Email is not provided. Please provide email key and value in body."});
        }
    },

    getEveryUser: (req, res, next) => 
    {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error getEveryUser:", error);
                res.status(500).json(error);
            }  
            else res.status(200).json(results);
        }
        
        model.getAllUsers(callback);
    },

    filterUsersBySearchKey: (req, res, next) =>
    {
        const name_exist = (typeof req.body.name !== "undefined");
		const email_exist = (typeof req.body.email !== "undefined");
        const role_exist = (typeof req.body.role !== "undefined");
		const userid_exist = (typeof req.body.userid !== "undefined") && !(isNaN(req.body.userid));
		const all_info_exist = name_exist && email_exist && role_exist && userid_exist;

        if (all_info_exist)
        {
            let nameSearch = '%';
            let emailSearch = '%';
            let roleSearch = '%';
            let useridLowerSearch = '0'; 
            let useridUpperSearch = '9999';

            if ((req.body.name).length !== 0)
            {
                nameSearch = '%' + req.body.name + '%';
            }            

            if ((req.body.email).length !== 0)
            {
                emailSearch = '%' + req.body.email + '%';
            }  

            if ((req.body.role).length !== 0)
            {
                roleSearch = '%' + req.body.role + '%';
            }  

            if ((req.body.userid).length !== 0)
            {
                useridLowerSearch = req.body.userid;
                useridUpperSearch = req.body.userid;
            }

            const data = {
                name: nameSearch,
                email: emailSearch,
                role: roleSearch,
				useridLower: useridLowerSearch,
                useridUpper: useridUpperSearch
            }            

			const callback = (error, results, fields) => {
				if (error) 
				{
					console.error("Error filterUsersBySearchKey:", error);
					res.status(500).json(error);
				} 
				else 
				{
					if(results.length == 0)
                    {
                        res.status(404).json({ message: "User not found"});
                    }
					else
                    {
                        res.status(200).json(results);
                    }
				}
			}

            model.filterUsers(data, callback);
        }
        else
        {
            res.status(500).json({ message: "Required http request body key and values are not provided as required by this web service."});
        }
    }
}

module.exports = userController;