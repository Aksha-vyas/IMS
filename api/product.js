
require('./models/db')
const Product = require('./models/product')
const {  UserInputError } = require('apollo-server-express');


// async function maxId()
// {
//     // const id = await Product.findOne({$query:{},$orderby:{id:1}})
//     const id = await Product.findOne({}).sort({ id: -1 })
//     .then((response)=> {
//         console.log(JSON.stringify("id inside the ql  "+response.id))
//         return !response?0:response.id;
//     });
//     return id;
// }


// function validateIssue(product) {
//     console.log(product)
//     const errors = [];
//     if (product.price < 1) {
//         errors.push('Price should be atleast 1')
//     }
//     if (product.price > 100000) {
//         errors.push('Price should be less than one lakh')
//     }
//     console.log(errors.length)
//     if (errors.length > 0) {
//         throw new UserInputError('Invalid input(s)', { errors });
//     }
// }


function productList()
{
    const products = Product.find({})
    .then((products)=> {
        return products;
    })
    return products;
}


async function addProduct(_, {product}) {
    const prod = new Product(product);
    const newProd = await prod.save();
    console.log('product added', newProd);
    return newProd;
    
}

async function updateProduct(_, { product }) {
    const prod = new Product(product);
    const res = await Product.updateOne({id:product.id},product);
    console.log("Response___api/product.js"+JSON.stringify(res))
    return "updated";
}

async function getProduct(_, { id }) {
    const product = await Product.findOne({ id });
    return product;
}
  
module.exports = { addProduct, productList, getProduct, updateProduct};