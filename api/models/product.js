const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const product = new Schema({
    id:Number,
    name : String,
    // dateOfExpiry : Date,
    price : Number,
    barcode : String,

});


const Product = mongoose.model('Product', product);
module.exports = Product;
