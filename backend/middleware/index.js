const jsonwebtoken = require ('jsonwebtoken')



const isloggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jsonwebtoken.verify(token, 'super-secret')  //resolving the token to original data 

        req.currentUser = decoded
        next()
    }
    catch (e) {
        console.log(e)
        res.status(401).json('Not authorized!')
    }
} 


exports.isloggedIn = isloggedIn;