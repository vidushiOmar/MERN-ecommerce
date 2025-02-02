const { Product } = require("../model/Product")

exports.createProduct=async (req,res)=>{
    const product=new Product(req.body);
    try{
        const doc=await product.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json(err);
    }
    
    }
exports.fetchAllProducts=async(req,res)=>{
    let condition={}
    if(!req.query.admin){
        condition.deleted={$ne:true}
    }
    let query=Product.find(condition);
    let totalProductsQuery=Product.find({deleted:{$ne:true}});
    
    if(req.query.category){
        query= query.find({"category":req.query.category});
        totalProductsQuery=totalProductsQuery.find({"category":req.query.category});
    }
    if(req.query.brand){
        query= query.find({"brand":req.query.brand});
        totalProductsQuery= totalProductsQuery.find({"brand":req.query.brand});
    }
    if(req.query._sort && req.query._order){
        query= query.sort({[req.query._sort]:req.query._order});
    }

    const totalDocs=await totalProductsQuery.countDocuments();
    

    if(req.query._page && req.query._per_page){
        const pageSize=req.query._per_page;
        const page=req.query._page;
        query=query.skip(pageSize*(page-1)).limit(pageSize);
    }
    try{
        const doc=await query.exec();
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(doc);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchProductById=async(req,res)=>{
    const {id}=req.params;
    
    try{
        const product=await Product.findById(id);
        res.status(200).json(product);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.updateProduct=async(req,res)=>{
    const {id}=req.params;
    console.log(req.body);
    try{
        const product=await Product.findByIdAndUpdate(id,req.body,{new:true});
        console.log("product",product);
        res.status(200).json(product);
    }catch(err){
        res.status(400).json(err);
    }
}