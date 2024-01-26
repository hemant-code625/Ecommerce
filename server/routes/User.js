/* eslint-disable no-undef */
const express = require('express');
const {getAllUser, fetchUserById, updateUser } = require('../controller/User');
const router = express.Router();
//  /products is already added in base path
router.get('/', getAllUser)
    .get('/:id', fetchUserById)
    .patch('/:id', updateUser)

exports.router = router;