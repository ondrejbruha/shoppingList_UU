const shoppingListSchema = require('./schemas').shoppingList;
const mongoose = require("mongoose");
const generateId = require("./idGenerator");

class ShoppingListAbl {
    constructor() {
        this.model = mongoose.model('shoppingList', shoppingListSchema);
    }

    async list(req, res) {
        try {
            const userId = req?.authUser?.user_id;
            const shoppingListsFromDB = await this.model.find({user_id: userId});
            res.json(shoppingListsFromDB);
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async get(req, res) {
        try {
            const userId = req?.authUser?.user_id;
            const shoppingListId = req?.params?.id;
            const shoppingListFromDB = await this.model.findOne({user_id: userId, shoppingList_id: shoppingListId});
            if(shoppingListFromDB.owner_id !== userId || !shoppingListFromDB.writerList.contains(userId)){
                res.status(403).json({message: "Forbidden"});
                return;
            }
            if (shoppingListFromDB) {
                res.json(shoppingListFromDB);
            } else {
                res.status(404).json({message: "Not found"});
            }
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async post(req, res) {
        try {
            const userId = req?.authUser?.user_id;
            const shoppingList = req.body;
            shoppingList.user_id = userId;
            shoppingList.shoppingList_id = await generateId();
            const newShoppingList = new this.model(shoppingList);
            await newShoppingList.save();
            res.json(newShoppingList);
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async put(req, res) {
        try {
            const userId = req?.authUser?.user_id;
            const shoppingList = req.body;
            if (shoppingList.user_id !== userId) {
                res.status(403).json({message: "Forbidden"});
                return;
            }
            const shoppingListFromDB = await this.model.findOne({user_id: userId, shoppingList_id: shoppingList.shoppingList_id});
            if(shoppingListFromDB.owner_id !== userId || !shoppingListFromDB.writerList.contains(userId)){
                res.status(403).json({message: "Forbidden"});
                return;
            }
            shoppingListFromDB.name = shoppingList.name;
            shoppingListFromDB.writerList = shoppingList.writerList;
            shoppingListFromDB.save();
            res.json(shoppingListFromDB);
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async delete(req, res) {
        try {
            const userId = req?.authUser?.user_id;
            const shoppingList = req.body;
            if (shoppingList.user_id !== userId) {
                res.status(403).json({message: "Forbidden"});
                return;
            }
            const shoppingListFromDB = await this.model.findOne({user_id: userId, shoppingList_id: shoppingList.shoppingList_id});
            if(shoppingListFromDB.owner_id !== userId || !shoppingListFromDB.writerList.contains(userId)){
                res.status(403).json({message: "Forbidden"});
                return;
            }
            await this.model.deleteOne({user_id: userId, shoppingList_id: shoppingList.shoppingList_id});
            res.json({message: "OK"})
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async addItem(req, res) {
        try {
            const item = req.body;

        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async removeItem(req, res) {
        try {
            res.json(req.body); //todo shoppingList item removing logic
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }
}


module.exports = ShoppingListAbl;
