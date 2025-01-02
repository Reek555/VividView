



function isAdmin (req, res, next) {
    try {
        if (req.currentUser.role == 'admin')
            return next()

        return res.status(401).json('Not authorized!')

    }
    catch (err) {
        res.status(500).send('internal server error!')
    }


}


exports.isAdmin = isAdmin; 