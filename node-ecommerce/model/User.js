const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:Buffer,required:true},
    role:{type:String,required:true,default:'user'},
    addresses:{type:[Schema.Types.Mixed]},
    name:{type:String,default:'guest'},
    imageUrl:{type:String,default:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'},
    orders:{type:[Schema.Types.Mixed]}, 
    salt:{type:Buffer}
});

const virtual=userSchema.virtual('id');
virtual.get(function(){
    return this._id;
});
userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id;}
});

exports.User=mongoose.model('User',userSchema);