const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const verifyToken = require('../VerifyToken');

// UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const token = req.query.token;
    const isValid = await verifyToken(token);
    if (!isValid) {
      return res.status(403).json("Not authenticated!");
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    // Update username in posts and comments
    await Post.updateMany({ userId: req.params.id }, { username: updatedUser.username });
    await Comment.updateMany({ userId: req.params.id }, { author: updatedUser.username });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    const token = req.query.token;
    const isValid = await verifyToken(token);
    if (!isValid) {
      return res.status(403).json("Not authenticated!");
    }
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
