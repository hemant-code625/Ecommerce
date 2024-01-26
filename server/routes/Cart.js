/* eslint-disable no-undef */
const express = require('express');
const { AddToCart, FetchCartByUserId } = require('../controller/Cart');


const router = express.Router();
router.post('/',AddToCart)
    .post('/',FetchCartByUserId);

exports.router = router;