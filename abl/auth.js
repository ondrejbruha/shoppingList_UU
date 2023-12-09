const mongoose = require("mongoose");
const userSchema = require("./schemas").user;
const model = mongoose.model('user', userSchema);


async function auth(req, res, next) {
    let session = req.headers.session;
    if(session){
        let user = await model.findOne({session: session});
        if(user){
            req.authUser = user;
            next();
        }
        else {
            res.status(401).json({message: "Unauthorized"});
        }
    }
    else {
        res.status(401).json({message: "Unauthorized"});
    }
}


module.exports = auth;
