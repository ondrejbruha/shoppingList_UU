const express = require('express');
const router = express.Router();
const ShoppingList = require("../abl/shoppingList");
const shoppingList = new ShoppingList();
const auth = require("../abl/auth");

// :id - id of shopping list


router.get('/:id', auth,async (req, res) =>{
    await shoppingList.get(req, res);
});
router.post("/",auth, async (req, res)=>{
    await shoppingList.post(req,res);
})
router.put("/:id",auth, async (req, res)=>{
    await shoppingList.put(req, res);
})
router.delete("/:id", auth, async (req, res)=>{
    await shoppingList.delete(req, res);
})
router.put("/add_item/:id",auth, async (req, res)=>{
    await shoppingList.addItem(req, res);
})
router.put("/remove_item/:id",auth, async (req, res)=>{
    await shoppingList.removeItem(req, res);
})

module.exports = router;
