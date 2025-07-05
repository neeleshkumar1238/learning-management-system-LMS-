require("dotenv").config();
const express=require("express");
const cors=require("cors");
const mongoose=require('mongoose');
const authRoutes=require('./routes/auth-routes/index')
const app=express();
const PORT=process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI;

app.use(cors({
    origin:process.env.CLIENT_URL||"http://localhost:5173",
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:"true"
})
)


app.use(express.json());

//database connection
mongoose
    .connect(MONGO_URI)
    .then(()=>console.log("MONGODB is connected Successfully !!"))
    .catch((error)=>console.log("MONGODB connection get failled: ",error));


// routes configuration
app.use("/auth",authRoutes);

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({
        success:false,
        message:'Something went wrong'
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running at the PORT: ${PORT}`)
})

module.exports=app
