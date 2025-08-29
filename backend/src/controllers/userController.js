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
                        // Check if user is suspended
                        if (results[0].suspension_status === 'Suspended') {
                            res.status(403).json({
                                message: "Account is suspended. Reason: " + (results[0].suspension_reason || 'No reason provided')
                            });
                            return;
                        }
                        
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
        const role_exist = (typeof req.body.role !== "undefined");
        const body_info_exist = name_exist && email_exist && pw_exist && role_exist;
        
        if(body_info_exist)
        {
            // Use the role provided by the frontend, default to "Member" if not provided
            const user_role = req.body.role || "Member";
            const data = {
                name: req.body.name,
                email: req.body.email,
                role: user_role,
                password: res.locals.hash,
                suspension_status: 'Active',
                suspension_reason: null
            };
            
            res.locals.role = user_role;
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
            res.status(500).json({ message: "Name, email, password, and role are required."});	
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
    },

    updateUser: (req, res, next) => {
        const userid_exist = (typeof req.body.userid !== "undefined") && !(isNaN(req.body.userid));
        const name_exist = (typeof req.body.name !== "undefined");
        const email_exist = (typeof req.body.email !== "undefined");
        const role_exist = (typeof req.body.role !== "undefined");
        const password_provided = (typeof req.body.password !== "undefined");
        const suspension_status_provided = (typeof req.body.suspension_status !== "undefined");
        const suspension_reason_provided = (typeof req.body.suspension_reason !== "undefined");
        const all_info_exist = userid_exist && name_exist && email_exist && role_exist;

        if (all_info_exist) {
            const data = {
                userid: req.body.userid,
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                suspension_status: req.body.suspension_status || 'Active',
                suspension_reason: req.body.suspension_reason || null
            };

            // If password is provided, add it to data (it's already hashed by middleware)
            if (password_provided && req.body.password && req.body.password.trim().length > 0) {
                data.password = req.body.password;
                console.log('Password update: Password provided and added to data');
            } else {
                console.log('Password update: No password provided or empty');
            }
            
            console.log('Update data being sent to model:', JSON.stringify(data, null, 2));

            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error updateUser:", error);
                    res.status(500).json(error);
                } else {
                    if (results.affectedRows === 0) {
                        res.status(404).json({
                            message: "User not found for specified userid"
                        });
                    } else {
                        res.status(200).json({
                            message: "User updated successfully",
                            userid: data.userid
                        });
                    }
                }
            };

            model.updateUser(data, callback);
        } else {
            res.status(500).json({ 
                message: "Userid, name, email, and role are required for updating user." 
            });
        }
    },

    deleteUser: (req, res, next) => {
        const userid_exist = (typeof req.body.userid !== "undefined") && !(isNaN(req.body.userid));

        if (userid_exist) {
            const data = {
                userid: req.body.userid
            };

            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error deleteUser:", error);
                    res.status(500).json(error);
                } else {
                    if (results.affectedRows === 0) {
                        res.status(404).json({
                            message: "User not found for specified userid"
                        });
                    } else {
                        res.status(200).json({
                            message: "User deleted successfully",
                            userid: data.userid
                        });
                    }
                }
            };

            model.deleteUser(data, callback);
        } else {
            res.status(500).json({ 
                message: "Userid is required for deleting user." 
            });
        }
    }
}

module.exports = userController;