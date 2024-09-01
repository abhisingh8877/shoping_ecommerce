const port=4000;
const express=require('express')
const app=express();
const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");
const multer=require('multer');
const path=require('path');
const cors=require('cors');

require('dotenv').config();


app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    
})
// API CREATION
app.get('/',(req,res)=>{
    res.send("Express app is running")
})

const storage=multer.diskStorage({
    destination:'./new_uploads/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

})
const upload=multer({storage:storage});
// Creating upload Endpoint for image
// app.use("/images",express.static('new_uploads/images'));
app.use('/images', express.static(path.join(__dirname, 'new_uploads/images')));
app.post('/upload',upload.single('product'),(req,res)=>{
  res.json({
    success:1,
    image_url:`https://shoping-ecommerce-1.onrender.com/images/${req.file.filename}`
  })
})
// Schema for Creating Products
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    new_price:{
        type:Number,
        require:true
    },
    old_price:{
        type:Number,
        require:true
    },
    data:{
        type:Date,
        default:Date.now(),
    },
    avilable:{
        type:Boolean,
        default:true
    }

})
app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else
    id=1;
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    })
    
    await product.save();
   
    res.json({
        success:true,
        name:req.body.name
    })
})
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});

    res.json({
        success:true,
        name:req.body.name
    })
})
app.get('/allproducts',async(req,res)=>{
    let products= await Product.find({});
    
    res.send(products);
})
// Schema creating for User model
const Users=mongoose.model('Users',{
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object
    },
    data:{
        type:Date,
        default:Date.now,
    }

})
// creating Endpoint for registering the user
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check)
    {
        return res.status(400).json({success:false,error:"existing user found with same email address"})

    }
    let cart={};
    for(let i=0;i<300;i++)
    {
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();
    const data={
        user:{
            id:user._id
        }
    }
    const token =jwt.sign(data,process.env.SECRET_KEY);
    res.json({success:true,token})
})

//creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user)
    {
        const passCompare=req.body.password===user.password
        if(passCompare)
        {
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,process.env.SECRET_KEY);
            res.json({success:true,token})
        }
        else
        {
            res.json({success:false,error:"wrong password"})
        }
    }
    else
    {
        res.json({success:false,errors:"wrong Email id"});
    }
})

//creating endpoint for newCollection data
app.get('/newcollection',async(req,res)=>{
    let products=await Product.find({});
    let newCollection=products.slice(1).slice(-8);
    
    res.send(newCollection);
})
// creating endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"women"})
    let popular_in_women=products.splice(0,4);
    
    res.send(popular_in_women);
})
  
// creating middleware to fetch user
const fetchUser= async (req,res,next)=>{
    const token=req.header('auth-token');
   
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using valid token"})

    }
    else
    {
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        }
        catch(error)
        {
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}
//creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id})
    
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added to database");
})
// creating endPoint for removing products in cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id})
  
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})
// creating endpoint for get card data
app.post('/getcart',fetchUser,async(req,res)=>{
    
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData)
})
app.listen(port,(error)=>{
    if(!error)
    {
        console.log("server is running at port "+port)
    }
    else
    {
        console.log("Error :"+error)
    }
}

)

