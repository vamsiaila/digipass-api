const router = require('express').Router();
const Buses = require('../models/buses');

router.post('/',(req,res)=>{
    Buses.find({busno:req.body.busno})
    .exec((error,exist)=>{
        if(error) throw err;
        else{
            if(exist.length)
                res.status(400).send({status:false,response:exist,message:'busno already exist'})
            else{
                const bus = new Buses(req.body);
                bus.save((err,data)=>{
                    if(err) throw err;
                    else
                        res.send({status:true,response:data,message:'succesfully added'});
                })
            }
        }
    })
})

router.get('/',(req,res)=>{
    Buses.find()
    .populate({path:'route',populate:[{path:'city'},{path:"stage"}]})
    .exec((err,result)=>{
        if(err) throw err;
        else
            res.send({status:true,response:result,message:''})
    })
})

router.get('/:id',(req,res)=>{
    Buses.findById(req.params.id)
    .populate({path:'route',populate:{path:'city'},populate:{path:'stage'}})
    .exec((err,result)=>{
        if(err) throw err;
        else
            res.send({status:true,response:result,message:''})
    })
})

router.get('/route/:id', (req,res)=>{
    Buses.find({route:req.params.id})
    .populate({path:'route',populate:{path:'city'},populate:{path:'stage'}})
    .exec((err,result)=>{
        if(err) throw err;
        else
            res.send({status:true,response:result,message:''})
    })
})

router.delete('/:id',(req,res)=>{
    Buses.findByIdAndRemove(req.params.id)
    .exec((err,result)=>{
        if(err) throw err;
        else
            res.send({status:true,response:result,message:'successfully deleted'})
    })
})

module.exports = router;