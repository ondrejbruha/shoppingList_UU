const express = require('express');
const router = express.Router();
const ShoppingList = require("../abl/shoppingList");
const shoppingList = new ShoppingList();

router.get('/', async (req, res) =>{
    await shoppingList.get(req, res);
});
router.post("/", async (req, res)=>{
    await shoppingList.post(req,res);
})
router.put("/", async (req, res)=>{
    await shoppingList.put(req, res);
})
router.delete("/", async (req, res)=>{
    await shoppingList.delete(req, res);
})
router.put("/add_item", async (req, res)=>{
    await shoppingList.addItem(req, res);
})
router.put("/remove_item", async (req, res)=>{
    await shoppingList.removeItem(req, res);
})

module.exports = router;
