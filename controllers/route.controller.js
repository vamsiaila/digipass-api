const router = require('express').Router();
const Route = require('../models/route');
const City = require('../models/cities');
const Stage = require('../models/stages');


router.post('/city', (req,res)=>{
    const city = new City(req.body);
    city.save((err,result)=>{
        if(err) throw err;
        else    
            res.send({status:true,response:result,message:'succesfully added'})
    })
})

router.get('/cities', (req,res)=>{
    City.find()
    .populate('stages')
    .exec((err,result)=>{
        if(err) throw err;
        else    
            res.send({status:true,response:result,message:''})
    })
})

router.delete('/city', (req,res)=>{
    City.findOneAndRemove({_id:req.params.id})
    .exec((err,result)=>{
        if(err) throw err;
        else    
            res.send({status:true,response:result,message:'successfully deleted'})
    })
})

router.post('/stage', (req,res)=>{
    const stage = new Stage(req.body);
    stage.save((err,result)=>{
        if(err) throw err;
        else{
            City.update({_id:req.body.parent},{$push:{stages:result._id}})
            .exec((error,updated)=>{
                if(error) throw error;
                else
                    res.send({status:true,response:result,message:'succesfully added'})
            })
        }
    })
})

router.get('/stages', (req,res)=>{
    Stage.find()
    .exec((err,result)=>{
        if(err) throw err;
        else    
            res.send({status:true,response:result,message:''})
    })
})

router.delete('/stage', (req,res)=>{
    Stage.findOneAndRemove({_id:req.params.id})
    .exec((err,result)=>{
        if(err) throw err;
        else    
            res.send({status:true,response:result,message:'successfully deleted'})
    })
})

router.post('/', (req,res)=>{
    Route.find({$and:[{city:req.body.city},{stage:req.body.stage}]})
    .exec((error,exist)=>{
        if(error) throw error;
        else if(exist.length) res.status(400).send({status:false,response:exist,message:'route already exist'})
        else{
            const route = new Route(req.body);
            route.save((err,result)=>{
                if(err) throw err;
                else    
                    res.send({status:true,response:result,message:'succesfully added'})
            })        
        }
    })
})

router.get('/',(req,res)=>{
    Route.find()
    .populate('city')
    .populate('stage')
    .exec((err,result)=>{
        if(err) throw err;
        else    
        res.send({status:true,response:result,message:''})
    })
})

router.get('/:id',(req,res)=>{
    Route.findById(req.params.id)
    .populate('city')
    .populate('stage')
    .exec((err,result)=>{
        if(err) throw err;
        else
        res.send({status:true,response:result,message:''})
    })
})

router.delete('/:id',(req,res)=>{
    Route.findOneAndRemove({_id:req.params.id})
    .exec((err,result)=>{
        if(err) throw err;
        else    
            res.send({status:true,response:result,message:'successfully deleted'})
    })
})




module.exports = router;