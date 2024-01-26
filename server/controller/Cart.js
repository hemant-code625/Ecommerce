/* eslint-disable no-undef */

const {Cart} = require('../model/Cart');

exports.AddToCart = async(req,res) => {
    const cart = new Cart(req.body);
    try {
        const doc = await cart.save();
    res.status(201).json(doc);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.FetchCartByUserId = async(req,res) => {
    const {userId} = req.querry;
    try{
        const cartItems = await Cart.find({user:userId}).populate('user').populate('product');
        res.status(200).json(cartItems);
    }catch(error){
        res.status(400).json(error);
    }
}

// export const updateCart = async(req,res) => {
//     const {id} = req.params;
//     try {
//         const 
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }