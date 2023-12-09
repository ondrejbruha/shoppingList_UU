import crypto from "crypto";

function getRandomString() {
    return crypto.randomBytes(16).toString('hex');
}

async function generateId(model, idName) {
    let id = getRandomString();
    while (true) {
        let record = await model.findOne({[idName]: id});
        if (record) {
            id = getRandomString();
        } else {
            return id;
        }
    }
}

module.exports = generateId;
