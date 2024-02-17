const mongoose = require('mongoose');
const mongoUrl = 'mongodb://127.0.0.1/aman';

const mongoDB = async () => {
    await mongoose.connect(mongoUrl);
    console.log("Connected successfully");
    const collection = mongoose.connection.db.collection("cp");
    const data = await collection.find({}).toArray();
    
    if(data){
        const foodCategory = await mongoose.connection.db.collection("foodCategory")
        const cdata = await foodCategory.find({}).toArray();
        global.foodItems = data;
        global.foodCategory = cdata;

    }
   
};

module.exports = mongoDB;