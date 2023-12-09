const crypto = require('crypto');
const mongoose = require("mongoose");
const userSchema = require("./schemas").user;
const model = mongoose.model('user', userSchema);

function getRandomString(){
    return crypto.randomBytes(32).toString('hex');
}

async function sessionGenerator() {
    let session = getRandomString();
    while (true) {
        let user = await model.findOne({session: session});
        if (user) {
            session = getRandomString();
        }
        else {
            return session;
        }
    }
}

module.exports = sessionGenerator;
