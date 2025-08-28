// Middleware for handling plain text passwords (for development/testing)
var plainPasswordMiddleware = {
    comparePassword: (req, res, next) => 
    {
        const providedPassword = req.body.password;
        const storedPassword = res.locals.hash; // This contains the plain text password from database
        
        console.log('Plain password comparison:', {
            provided: providedPassword,
            stored: storedPassword,
            match: providedPassword === storedPassword
        });
        
        if (providedPassword === storedPassword) 
        {
            res.locals.message = 'Password provided is correct.';
            console.log('Plain password: password provided is correct');
            next();
        } 
        else 
        {
            res.locals.message = '';
            res.status(401).json({
                message: "Password provided is wrong."
            });
        }
    },

    hashPassword: (req, res, next) => 
    {
        // For plain text passwords, we don't hash - just pass through
        res.locals.hash = req.body.password;
        console.log('Plain password: storing password as plain text');
        next();
    },

    hashPasswordIfProvided: (req, res, next) => 
    {
        // For plain text passwords, we don't hash - just pass through
        if (req.body.password && req.body.password.trim().length > 0) {
            console.log('Plain password: Password provided, storing as plain text');
            // Keep the password as is
            next();
        } else {
            console.log('Plain password: No password provided, skipping');
            next();
        }
    }
}

module.exports = plainPasswordMiddleware;
