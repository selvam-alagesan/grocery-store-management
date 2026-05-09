const mongoose = require('mongoose');

const connectdb = async ()=>{
    try{
        const conn =  await mongoose.connect(process.env.MONGO_URI) ;
        console.log(`Mongodb is connected successfully ${conn.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}
module.exports = connectdb;