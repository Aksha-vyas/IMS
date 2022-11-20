const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://fullstack:assignment@fscluster1.z3dws.mongodb.net');
mongoose.connection.on("connected", function(){    
    console.log("Application is connected to Databse");
})
