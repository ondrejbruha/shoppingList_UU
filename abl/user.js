const mongoose = require("mongoose");
const userSchema = require("./schemas").user;
const hashPassword = require("./hashPassword");
const sessionGenerator = require("./sessionGenerator");
const bcrypt = require('bcrypt');
const generateId = require("./idGenerator");

class UserAbl {
    constructor(){
        this.model = mongoose.model('user', userSchema);
    }
    async get(req,res){
        try{
            const userId = req?.authUser?.user_id;
            const userFromDB = await this.model.findOne({user_id: userId});
            if(userFromDB){
                res.json({user_id: userFromDB.user_id, name: userFromDB.name, email: userFromDB.email});
            }
            else {
                res.status(404).json({message: "Not found"});
            }
        }catch(err){
            res.status(400).json({message: "Bad request"});
        }
    }
    async post(req,res){
        try{
            const user = req.body;
            const userFromDB = await this.model.findOne({email: user.email});
            if(userFromDB){
                res.status(409).json({message: "Conflict"});
            }
            else {
                user.password = await hashPassword(user.password);
                user.user_id = await generateId(this.model, "user_id");
                const newUser = new this.model(user);
                await newUser.save();
                res.json({user_id: newUser.user_id, name: newUser.name, email: newUser.email});
            }
        }catch(err){
            res.status(400).json({message: "Bad request"});
        }
    }
    async put(req,res){
        try{
            const user = req.body;
            const userId = req?.authUser?.user_id;
            if(user.user_id !== userId){
                res.status(403).json({message: "Forbidden"});
                return;
            }
            const userFromDB = await this.model.findOne({user_id: userId});
            userFromDB.name = user.name;
            userFromDB.email = user.email;
            userFromDB.save();
            res.json({
                user_id: userFromDB.user_id,
                name: userFromDB.name,
                email: userFromDB.email
            });
        }catch(err){
            res.status(400).json({message: "Bad request"});
        }
    }
    async delete(req,res){
        try{
            const user = req?.authUser;
            await this.model.deleteOne({user_id: user.user_id});
            res.json({message: "OK"})
        }catch(err){
            res.status(400).json({message: "Bad request"});
        }
    }
    async session(req, res){
        try{
            let user = req.body;
            let userFromDB = await this.model.findOne({email: user.email});
            const compare = await bcrypt.compare(user?.password, userFromDB?.password);
            if(compare){
                let session = await sessionGenerator();
                userFromDB.session = session;
                userFromDB.save();
                res.json({session: session});
            }
            else {
                res.status(401).json({message: "Unauthorized"});
            }
        }catch(err){
            res.status(400).json({message: "Bad request"});
        }
    }
}

module.exports = UserAbl;
