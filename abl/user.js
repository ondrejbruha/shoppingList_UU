const Ajv = require('ajv');
const ajv = new Ajv();

class UserAbl {
    constructor(){
        this.schema = {
            type: "object",
            properties: {
                id: {type: "number"},
                name: {type: "string"},
                email: {type: "string"},
                password: {type: "string"},
                role: {type: "string"},
                createdAt: {type: "string"},
                updatedAt: {type: "string"}
            },
            required: ["name", "email", "password", "role"]
        }
    }
    async get(req,res){
        try{
            res.json(req.body); //todo user findig logic
        }catch(err){
            res.status(400).json({message: "Bad request"});
        }
    }
    async post(req,res){
        try{
            const valid = ajv.validate(this.schema, req.body);
            if(!valid){
                res.status(400).json({message: "Bad request"});
                return;
            }
            res.json(req.body); //todo user creation logic
        }catch(err){
            res.status(400).json({message: "Bad request"});
        }
    }
    async put(req,res){
        try{
            const valid = ajv.validate(this.schema, req.body);
            if(!valid){
                res.status(400).json({message: "Bad request"});
                return;
            }
            res.json(req.body); //todo user updating logic
        }catch(err){
            res.status(400).json({message: "Bad request"});
        }
    }
    async delete(req,res){
        try{
            res.json(req.body); //todo user deleting logic
        }catch(err){
            res.status(400).json({message: "Bad request"});
        }
    }
}
