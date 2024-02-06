const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/',async(req,res)=>{
    try{
        const data = req.body
        const newMenu = new MenuItem(data)
        const response = await newMenu.save()
        console.log('data saved');
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
  
router.get('/',async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get('/:taste',async(req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste == "sweet" || taste == "spicy" || taste == "sour"){
            const response = await MenuItem.find({taste:taste});
            console.log('response fetched');
            res.status(200).json(response)
        }else{
            res.status(404).json({error:"Invalid taste"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

router.put('/:id',async (req,res)=>{
    try{
        const menuId = req.params.id
        const updatedMenuId = req.body

        const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenuId,{
            new: true,//Return the updated document
            runValidators: true,//Run mongoose validation
        });

        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log('data updated');
        res.status(200).json(response);
    
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const menuId = req.params.id
        const response = await MenuItem.findOneAndDelete(menuId)
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }else{
            console.log('data deleted');
            res.status(200).json({message:"data deleted successfully"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
})

module.exports = router;