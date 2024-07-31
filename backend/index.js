const express = require("express");
const app = express();
const multer  = require('multer')
const path=require("path")
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth');
const userRoute = require('./routes/userss');
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')




//middlewares
dotenv.config();
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments',commentRoute)

//Image Upload
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})
const upload = multer({storage:storage})
app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("Image Uploaded Sucessfully")
})

//database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("database is connected successfully!");
    } catch (err) {
        console.log(err);
        process.exit(1); // Exit process with failure
    }
};

// Connect to the database before starting the server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("app is running on port " + process.env.PORT);
    });
});
