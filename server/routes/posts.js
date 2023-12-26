const { PostModel } = require("../models/postModel")
const express = require("express");
const { validPost } = require("../validation/postValidation")
const { auth, authAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", async (req, res) => {
    res.json({ msg: "post work" })
})

router.post("/",auth, async (req, res) => {
    let post =req.body;
    // post.user_created = req.tokenData._id
    post={
        user_created:req.tokenData._id,
        ...post
    }
    postValid = validPost(post);
    if (postValid.error) {
        return res.status(400).json(postValid.error.details);
    }
    try {
        const post1 = new PostModel(post);
        await post1.save();
        res.json(post1);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
  });

router.get("/:id", async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    res.json(post);
});

router.delete("/:id", auth, async (req, res) => {
    let id = req.params.id;
    let post;
    try{

        if (req.tokenData.role == "admin") {
            post = await PostModel.findByIdAndDelete(id);
        }
        else {
            console.log(req.tokenData._id);
            data = await PostModel.findByIdAndDelete({ _id: id, user_id: req.tokenData._id }, post)
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err }) 
    }
    res.json(post);
});

module.exports = router;