const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.post('/', (req,res)=>{
    Student.find({regNo:req.body.regNo})
    .exec((error,exist)=>{
        if(error) throw error;
        else if(exist.length)
            res.status(400).send({status:false,response:exist,message:'reg no already exist'});
        else{
            let student = new Student(req.body)
            student.save((err,saved)=>{
                if(err) throw err;
                else
                    res.send({status:true,response:saved,message:'successfully saved'})
            })
        }  
    })
})

router.put('/:id', (req,res)=>{
    Student.findByIdAndUpdate(req.params.id,req.body,(err,success)=>{
        if(err) throw err;
        else res.send({status:true,response:success,message:'successfully updated'})
    })
})

router.get('/byregno/:no',(req,res)=>{
    Student.find({regNo:req.params.no})
    .populate({path:'route',populate:[{path:'city'},{path:"stage"}]})
    .exec((err,result)=>{
        if(err) throw err;
        else if(result.length){
            res.send({status:true,response:result,message:''})
        }
        else{
            res.status(404).send({status:false,response:result,message:'no students found with given details'})
        }
    })
})

module.exports = router;