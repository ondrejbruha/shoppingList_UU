const Ajv = require('ajv');
const ajv = new Ajv();

class ShoppingListAbl {
    constructor() {
        this.listSchema = {
            type: "object",
            properties: {
                owner_id: {type: "string"},
                writer_list: {type: "array", items: {type: "string"}},
                shoppingList_id: {type: "string"},
                name: {type: "string"},
                required: ["name", "owner_id"]
            }
        }
        this.itemSchema = {
            type: "object",
            properties: {
                item_id: {type: "string"},
                name: {type: "string"},
                quantity: {type: "number"},
                unit: {type: "string"},
                done: {type: "boolean"},
            }

        }
    }

    async get(req, res) {
        try {
            res.json(req.body); //todo shoppingList findig logic
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async post(req, res) {
        try {
            const valid = ajv.validate(this.listSchema, req.body);
            if (!valid) {
                res.status(400).json({message: "Bad request"});
                return;
            }
            res.json(req.body); //todo shoppingList creation logic
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async put(req, res) {
        try {
            const valid = ajv.validate(this.listSchema, req.body);
            if (!valid) {
                res.status(400).json({message: "Bad request"});
                return;
            }
            res.json(req.body); //todo shoppingList updating logic
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async delete(req, res) {
        try {
            res.json(req.body); //todo shoppingList deleting logic
        } catch (err) {
            res.status(400).json({message: "Bad request"});
        }
    }

    async addItem(req, res) {
        try {
            const valid = ajv.validate(this.itemSchema, req.body);
            if (!valid) {
                res.status(400).json({message: "Bad request"});
                return;
            }
            res.json(req.body); //todo shoppingList item adding logic
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
