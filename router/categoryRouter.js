const express=require('express')
const Category = require('../models/categoryModel')
const router=express.Router()

router.route('/addCategory').post(async(req,res)=>{
    try {
       const category = await Category.create(req.body)
        res.status(200).json({message:'category added', status:true})
    } catch (error) {
        res.status(500).json({message: error.message, status:false})
    }
})



router.route('/getAllCategory').get(async(req,res)=>{

    try {
       const categories=await Category.find({})
       res.status(200).json({categories:categories,status:true}) 
    } catch (error) {
        res.status(500).json({message: error.message, status:false})
    }
})




router.route('/:id').post(async(req,res)=>{
    try {
      
        const {id}=req.params
        const category=await Category.findById(id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message: error.message, status:false})
    }
    
    })


    router.route('/:id').put(async(req,res)=>{

        try {
            const {id}=req.params
            const category= await Category.findByIdAndUpdate(id,req.body)
            if (!category) {
                return res.status(404).json({message:'category not found',status:false})
            }
            res.status(200).json({message:`${req.body.name} updated`})
           
            
        } catch (error) {
            res.status(500).json({message: error.message, status:false})
        }

    })


    router.route('/:id').delete(async(req,res)=>{

        try {
            const{id}=req.params
            const category=await Category.findByIdAndDelete(id,req.body)
            if (!category) {
                return res.status(404).json({message:'category not found',status:false})
            }
            res.status(200).json({message:`${category.name} deleted!`})
            
        } catch (error) {
            res.status(500).json({message: error.message, status:false}) 
        }
    })



module.exports=router

