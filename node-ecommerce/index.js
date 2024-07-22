const express=require('express');
const server=express();
const crypto=require('crypto');
const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const session=require('express-session');
const passport=require('passport');
const { createProduct } = require('./controller/Product');
const productsRouter=require('./routes/Products');
const categoriesRouter=require('./routes/Category');
const brandsRouter=require('./routes/Brand');
const usersRouter=require('./routes/User');
const authRouter=require('./routes/Auth')
const cartRouter=require('./routes/Cart');
const ordersRouter=require('./routes/Order')
const { User } =require('./model/User');
const { isAuth, sanitizeUser, cookieExtractor } =require('./services/common');
const cookieParser=require('cookie-parser')
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const jwt=require('jsonwebtoken');
const SECRET_KEY='SECRET_KEY';
server.use(express.static('build'))
server.use(cookieParser());

const opts={}
opts.jwtFromRequest=cookieExtractor;
opts.secretOrKey=SECRET_KEY;

server.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    
}));
server.use(passport.authenticate('session'));

const cors=require('cors');
server.use(express.json());
server.use(cors({
    exposedHeaders:['X-Total-Count']
}));
server.use('/products',isAuth(),productsRouter.router);
server.use('/categories',isAuth(),categoriesRouter.router);
server.use('/brands',isAuth(),brandsRouter.router);
server.use('/users',isAuth(),usersRouter.router);
server.use('/auth',authRouter.router);
server.use('/cart',isAuth(),cartRouter.router);
server.use('/orders',isAuth(),ordersRouter.router);


passport.use('local',new LocalStrategy(
    {usernameField:'email'},
    async function(email,password,done){
        try{
            const user=await User.findOne({email:email}).exec();
            if(!user){    
                done(null,false,{message:'no such user email'});
            }
            crypto.pbkdf2(password,user.salt,310000,32,'sha256',async function(err,hashedPassword){
                    if(!crypto.timingSafeEqual(user.password,hashedPassword)){
                        done(null,false,{message:'invalid credentials'});
                        
                    }else{
                        const token=jwt.sign(sanitizeUser(user),SECRET_KEY);
                        done(null,{id:user.id,role:user.role,token});      
                    }
                })
        
            
        }catch(err){
            done(err);
        }
        
    }
));
passport.use('jwt',new JwtStrategy(opts,async function(jwt_payload,done){
    try{
        console.log("Hello");
        const user=await User.findById(jwt_payload.id)
        if(user){
            return done(null,sanitizeUser(user));
        }else{
            return done(null,false);
        }
    }catch(err){
        
        return done(err,false);
        
        
    }
}));
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {id:user.id,role:user.role});
    });
  });
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb+srv://vidushiomar123:Vidu7380@mern-ecommerce.mk5ux29.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=MERN-Ecommerce')
    console.log('connected');
}


    
server.get('/',(req,res)=>{
    res.json({status:'success'});
})

server.post('/products',createProduct);

server.listen(8080,()=>{
    console.log('server started');
    
    
})
