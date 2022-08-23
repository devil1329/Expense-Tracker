const model = require('../models/model.js');

// post: http://localhost:8080/api/categories
async function create_Categories(req,res){
    const Create = new model.Categories({
        type: "Investment",
        color: "#fcbe44"
    })
    
    await Create.save(function(err){
        if(!err) return res.json(Create);
        
        return res.status(400).json({message : `Error while creating categories ${err}`})
    })
    
}

// get: http://localhost:8080/api/categories
async function get_Categories(req,res){
    let data = await model.Categories.find({})
    let filter = await data.map(v=> Object.assign({}, {type:v.type, color:v.color}));
    return res.json(filter);
}

// post: http://localhost:8080/api/transactions
async function create_Transaction(req,res){
    if(!req.body) return res.status(400).json("Post HTTP data not Provided");
    let {name, type, amount} = req.body;

    const Create = await new model.Transaction(
        {
            name,
            type,
            amount,
            date : new Date() 
        }
    )
    
    await Create.save(function(err){
        if(!err) return res.json(Create);
        
        return res.status(400).json({message : `Error while creating transaction ${err}`})
    })
}

// get: http://localhost:8080/api/transactions
async function get_Transaction(req,res){
    let data = await model.Transaction.find({})
    let filter = await data.map(v=> Object.assign({}, {name:v.name, type:v.type, amount:v.amount}));
    return res.json(filter);
}

// delete: http://localhost:8080/api/transactions
async function delete_Transaction(req,res){
    if(!req.body) res.status(400).json({message : `request body not Found`});
    await model.Transaction.deleteOne(req.body,function(err){
        if(!err) return res.json("Record Deleted");
    }).clone().catch(function(err){res.json("Error while deleting Transaction Record")})
}

// get: http://localhost:8080/api/labels
async function get_labels(req,res){
    model.Transaction.aggregate([
        {
            $lookup : {
                from : "categories",
                localField: 'type',
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
            $unwind:"$categories_info"
        }
    ]).then(result => {
        let filter =  result.map(v=> Object.assign({}, {_id:v._id, name:v.name, type:v.type, amount:v.amount, color: v.categories_info['color']}));
        return res.json(filter);
    }).catch(error => {
        res.status(400).json("Lookup Collection Error")
    })
}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_labels
}