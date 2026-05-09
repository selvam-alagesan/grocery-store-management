const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const User = require('./models/admin');

const seedAdmin = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        const existingAdmin = await User.findOne({username: 'admin@email.com'});
        if(!existingAdmin){
            const admin = new User({
                username: 'admin@email.com' ,
                password: 'admin'
            });
            await admin.save();
            console.log("admin created successfully");
        }else{
            console.log("admin already exists");
        }
    }catch(err){
        console.log(`error occured ${err}`);
    }finally{
        await mongoose.connection.close();
    }
}

seedAdmin();