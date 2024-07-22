const { User } = require("../model/User")

exports.fetchUserById=async(req,res)=>{
    const {id}=req.user;
    console.log("request.user",req.user)
    try{
        const user=await User.findById(id,'name email id role addresses imageUrl').exec();
        delete user.password;
        delete user.salt;
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err);
    }
}



exports.updateUser=async(req,res)=>{
    const {id}=req.params;
    
    try{
        const user=await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err);
    }
}