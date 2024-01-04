const { PostModel } = require("../models/postModel")
const { UserModel } = require("../models/userModel")
const express = require("express");
const { validPost } = require("../validation/postValidation")
const { auth, authAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    let userID = req.tokenData._id
    console.log(userID);
    try {
        const user = await UserModel.findById(userID)
        console.log(user);
        if (user.posts.length > 0) {
            await user.populate('posts')
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ posts: user.posts });
    } catch (error) {
        console.error(`Error in /posts/user/${userID} route`, error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete("/:id", auth, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.tokenData._id;

        // Find the post
        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has permission to delete the post
        if (post.user_created !== userId && req.tokenData.role !== "admin") {
            return res.status(403).json({ error: 'Unauthorized: You do not have permission to delete this post' });
        }

        // Delete the post
        await PostModel.findByIdAndDelete(postId);

        // Remove the post from the user's posts array
        await UserModel.findByIdAndUpdate(userId, { $pull: { posts: postId } });

        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error', err });
    }
});

// ... (existing code)

router.put("/:id", auth, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.tokenData._id;

        // Find the post
        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has permission to edit the post
        if (post.user_created !== userId) {
            return res.status(403).json({ error: 'Unauthorized: You do not have permission to edit this post' });
        }

        // Update the post with the new data
        const updatedPostData = req.body;
        const updatedPost = await PostModel.findByIdAndUpdate(postId, updatedPostData, { new: true });

        res.json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error', err });
    }
});

// ... (existing code)


// router.post("/",auth, async (req, res) => {
//     let post =req.body;
//     // post.user_created = req.tokenData._id
//     post={
//         user_created:req.tokenData._id,
//         ...post
//     }
//     postValid = validPost(post);
//     if (postValid.error) {
//         return res.status(400).json(postValid.error.details);
//     }
//     try {
//         const post1 = new PostModel(post);
//         await post1.save();
//         res.json(post1);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: "there error try again later", err })
//     }
//   });
router.post("/", auth, async (req, res) => {
    try {
        const userId = req.tokenData._id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let post = req.body;
        post = {
            user_created: userId,
            ...post
        };

        const postValid = validPost(post);

        if (postValid.error) {
            return res.status(400).json(postValid.error.details);
        }

        const newPost = new PostModel(post);
        await newPost.save();

        // Add the post to the user's posts array
        user.posts.push(newPost._id);
        await UserModel.findByIdAndUpdate(userId, user);

        res.json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error", err });
    }
});


router.get("/:id", async (req, res) => {
    const post = await PostModel.findById(req.params.id).populate({
        path: 'like_user',
        select: '_id full_name'
    });
    res.json(post);
});

router.delete("/:id", auth, async (req, res) => {
    let id = req.params.id;
    let post;
    try {

        if (req.tokenData.role == "admin") {
            post = await PostModel.findByIdAndDelete(id);
        }
        else {
            console.log(req.tokenData._id);
            data = await PostModel.findByIdAndDelete({ _id: id, user_id: req.tokenData._id }, post)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
    res.json(post);
});
router.put("/add/:id", auth, async (req, res) => {
    let id = req.params.id;
    let tokenId = req.tokenData._id;
    console.log(tokenId);
    try {
        let post = await PostModel.findOne({ _id: id });

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // החלק החשוב: מחשבים את הערך החדש של like_num
        let newLikeNum = post.like_num + 1;

        // מעדכנים את המודל עם הערכים החדשים
        let data = await PostModel.updateOne(
            { _id: id },
            { $push: { like_user: tokenId }, $set: { like_num: newLikeNum } }
        );

        res.json({ msg: "Successfully updated user likes", data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There was an error, please try again later", err });
    }
});
router.put("/decrease/:id", auth, async (req, res) => {
    let id = req.params.id;
    let tokenId = req.tokenData._id;
    console.log(tokenId);

    try {
        let post = await PostModel.findOne({ _id: id });

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // החלק החשוב: מחשבים את הערך החדש של like_num
        let newLikeNum = post.like_num - 1;

        // מעדכנים את המודל עם הערכים החדשים
        let data = await PostModel.updateOne(
            { _id: id },
            { $pull: { like_user: tokenId }, $set: { like_num: newLikeNum } }
        );

        res.json({ msg: "Successfully updated user likes", data });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There was an error, please try again later", err });
    }
});


module.exports = router;