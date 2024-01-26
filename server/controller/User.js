/* eslint-disable no-undef */
const User = require('../model/Users');

exports.fetchUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(400).json({ error: 'Error fetching user' });
    }
  };

  exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  exports.getAllUser = async (req, res) => {
    
    try {
        const users = User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json(err);
    }
  }