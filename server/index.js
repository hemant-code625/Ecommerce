/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const express = require('express');
const server = express();
const mongoose = require('mongoose');
const { createProduct } = require('./controller/Product');
const dotenv = require('dotenv');
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const cartRouter = require('./routes/Cart');
const userRouter = require('./routes/User');
const cors = require('cors')

//middlewares

server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
dotenv.config();
server.use(express.json()); // to parse req.body
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router)
server.use('/brands', brandsRouter.router)
server.use('/carts', cartRouter.router)
server.use('/users', userRouter.router);

main().catch(err=> console.log(err));

async function main(){
    // await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    await mongoose.connect(`mongodb+srv://mongodb-ecommerce:${process.env.DB_PASS}@cluster0.pk2evkv.mongodb.net/ecommerce`)
    console.log('database connected')
}

server.get('/',(req, res)=>{
    res.json({status:'success'})
})



server.listen(8080, ()=>{
    console.log('server is live on port 8080')
})