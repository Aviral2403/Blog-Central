const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../VerifyToken')

//CREATE
router.post("/create", async (req, res) => {
    try {
        const token = req.query.token;
        const isValid = await verifyToken(token);
        if (!isValid) {
            return res.status(403).json("Not authenticated!");
        }
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }
    catch (err) {
        res.status(500).json(err)
    }

})

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const token = req.query.token;
        const isValid = await verifyToken(token);
        if (!isValid) {
            return res.status(403).json("Not authenticated!");
        }
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedComment)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const token = req.query.token;
        const isValid = await verifyToken(token);
        if (!isValid) {
            return res.status(403).json("Not authenticated!");
        }
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment has been deleted!")

    }
    catch (err) {
        res.status(500).json(err)
    }
})




//GET POST COMMENTS
router.get("/post/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
        res.status(200).json(comments)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router