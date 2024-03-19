const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const Post = require("../model/Post");

const postController = {
  addPost: async (req, res) => {
    try {
      const { description, img_path, user_id, username, profile_picture } =
        req.body;

      const newPost = new Post({
        description,
        img_path,
        user_id,
        username,
        profile_picture,
      });
      await newPost.save();

      const formated = {
        _id: newPost.id,
        description: newPost.description,
        img_path: newPost.img_path,
        user_id: newPost.user_id,
        username: newPost.username,
        profile_picture: newPost.profile_picture,
        like: newPost.like.length,
        createdAt: newPost.createdAt
      };

      res.status(201).json(formated);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  },
  likeUnLike: async (req, res) => {
    try {
      const { post_id, user_id } = req.body;
      const post = await Post.findById(post_id);
      if (post.like.includes(user_id)) {
        post.like = post.like.filter((id) => id !== user_id);
      } else {
        post.like.push(user_id);
      }
      await post.save();
      res.status(201).json(post);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  },
  getAllPost: async (req, res) => {
    try {

      const user_id=req.user._id;
      const post = await Post.find().sort("-createdAt");
      const formatPost = [];

      post.map((post) => {

        let isLiked = post.like.includes(user_id);
        const formated = {
          _id: post.id,
          description: post.description,
          img_path: post.img_path,
          user_id: post.user_id,
          username: post.username,
          profile_picture: post.profile_picture,
          like: post.like.length,
          createdAt: post.createdAt,
          isLiked: isLiked,
        };
        
        formatPost.push(formated);
      });
      return res.json(formatPost);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  },
};
module.exports = postController;
