const express = require("express");
const router = express.Router();

router.post("/foodData",(req,res)=>{

    try { 
         const fooditems = global.foodItems;
         const foodCategory = global.foodCategory;
         res.send({fooditems,foodCategory})

    } catch (error) {
        console.log(error.message);
        res.send("server Error");
    }
})

module.exports = router;