const bcrypt = require("bcrypt");
const saltRounds = 10;

var bcryptMiddleware = {
    comparePassword: (req, res, next) => 
    {
        // Check password
        const callback = (err, isMatch) => {
            if (err) 
            {
                console.error("Error bcrypt:", err);
                res.status(500).json(err);
            } 
            else 
            {
                if (isMatch) 
                {
                    res.locals.message = 'Password provided is correct.';
                    //console.log('comparePassword: password provided is correct');
                    next();
                } 
                else 
                {
                    res.locals.message = '';
                    res.status(401).json({
                    message: "Password provided is wrong."
                    });
                }
            }
        };
        bcrypt.compare(req.body.password, res.locals.hash, callback);
    },

    hashPassword: (req, res, next) => 
    {
        const callback = (err, hash) => {
            if (err) 
            {
                console.error("Error bcrypt:", err);
                res.status(500).json(err);
            } 
            else 
            {
                res.locals.hash = hash;
                //console.log('Check hash generated:');
                //console.log(res.locals.hash);
                next();
            }
        };

        bcrypt.hash(req.body.password, saltRounds, callback);
    },

    hashPasswordIfProvided: (req, res, next) => 
    {
        // Only hash password if it's provided in the request
        if (req.body.password && req.body.password.trim().length > 0) {
            console.log('Bcrypt middleware: Password provided, hashing...');
            const callback = (err, hash) => {
                if (err) 
                {
                    console.error("Error bcrypt:", err);
                    res.status(500).json(err);
                } 
                else 
                {
                    // Replace the plain text password with the hash
                    req.body.password = hash;
                    console.log('Bcrypt middleware: Password hashed successfully');
                    next();
                }
            };

            bcrypt.hash(req.body.password, saltRounds, callback);
        } else {
            console.log('Bcrypt middleware: No password provided, skipping hash');
            // No password provided, continue without hashing
            next();
        }
    }

}

module.exports=bcryptMiddleware;