const express = require('express');
const router = express.Router();
const UserAbl = require("../abl/user");
const user = new UserAbl();

router.get('/', async (req, res) => {
    await user.get(req, res);
});
router.post("/", async (req, res)=>{
    await user.post(req,res);
})
router.put("/", async (req, res)=>{
    await user.put(req, res);
})
router.delete("/", async (req, res)=>{
    await user.delete(req, res);
})
router.get("/session", async (req, res)=>{
    await user.session(req, res);
})

module.exports = router;
