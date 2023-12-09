const express = require('express');
const router = express.Router();
const UserAbl = require("../abl/user");
const user = new UserAbl();
const auth = require("../abl/auth");

router.get('/', auth,async (req, res) => {
    await user.get(req, res);
});
router.post("/",async (req, res)=>{
    await user.post(req,res);
})
router.put("/",auth, async (req, res)=>{
    await user.put(req, res);
})
router.delete("/",auth, async (req, res)=>{
    await user.delete(req, res);
})
router.get("/session", async (req, res)=>{
    await user.session(req, res);
})

module.exports = router;
