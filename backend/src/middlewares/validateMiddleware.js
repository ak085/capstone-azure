var validator = require('validator');

var validateMiddleware = 
{
	validateUserRegister: (req, res, next) => 
	{
		var name = req.body.name;
		var email = req.body.email;
		var password = req.body.password;
		
		//use validator library to do checks
		// Allow spaces in names, validate email, check password exists
		validatePass = name && name.trim().length > 0 && 
					  validator.isEmail(email) && 
					  password && password.trim().length > 0;
		
		if (validatePass)
		{
			next();
		}
		else
		{
			res.status(500).json({ message: "User register input validation failed for values of json keys provided."});
		}
	},

	validateUserLogin: (req, res, next) =>
	{
		var email = req.body.email;
		var password = req.body.password;
		
		//use validator library to do checks
		// Allow common password characters, just check that password exists and has reasonable length
		validatePass = validator.isEmail(email) && password && password.trim().length > 0;

		if(validatePass)
		{
            console.log("user login input validation passed");
			next();
		}
		else
		{
            console.log("user login input validation failed");
			res.status(500).json({ message: "User login input validation failed for values of json keys provided."});
		}
	}

}

module.exports = validateMiddleware;