const mongoose = require('mongoose')

const shoppingList = new mongoose.Schema({
    owner_id: {type: String, required: true},
    writerList: [String],
    shoppingList_id: String,
    name: {type: String, required: true},
    items: [{
        item_id: String,
        name: {type: String, required: true},
        quantity: Number,
        unit: String
    }]
})

const user = new mongoose.Schema({
    user_id: String,
    name: String,
    email: String,
    password: String,
    session: String,
})


module.exports = {shoppingList, user}
