const db = require('../models');
require('dotenv').config();

const PostController = {
    getAll: async (req, res) => {
        const posts = await db.Post.findAll();
        if (posts.length <= 0) {
            res.status(404).json('No Post Found!');
        } else {
            const postsWithFullImagePath = posts.map(post => ({
                ...post.toJSON(),
                image: post.image ? `${process.env.IMG_URL}${post.image}` : null,
            }));
            res.status(200).json(postsWithFullImagePath);
        }
    },

    getAllAvailble: async (req, res) => {
        const posts = await db.Post.findAll({ where: { deleted: false } });
        if (posts.length <= 0) {
            res.status(404).json('No Post Found!');
        } else {
            const postsWithFullImagePath = posts.map(post => ({
                ...post.toJSON(),
                image: post.image ? `${process.env.IMG_URL}${post.image}` : null,
            }));
            res.status(200).json(postsWithFullImagePath);
        }
    },

    getById: async (req, res) => {
        const post = await db.Post.findOne({ where: { id: req.params.id} });
        if (post === null) {
          res.status(404).json('No Post Found!');
        } else {
            const postsWithFullImagePath = {
                ...post.toJSON(),
                image: post.image ? `${process.env.IMG_URL}${post.image}` : null,
            }
            res.status(200).json(postsWithFullImagePath)
        }
    },

    create: async (req, res) => {
        try {
          const data = req.body;
          const imagePath = req.file ? `uploads/images/${req.file.filename}` : null;
          const newPost = await db.Post.create({
            title: data.title,
            description: data.description,
            content: data.content,
            image: imagePath,
            createdBy: data.createdBy, 
            deleted: false,
          });

          res.status(201).json(newPost);
        } catch (error) {
          console.error('Error creating post:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    },
      
    update: async (req, res) => { 
        try {
            const id = req.params.id;
            const data = req.body;
            let updatePost;
            if (!req.file) {
                updatePost = {
                  title: data.title,
                  description: data.description,
                  content: data.content,
                  createdBy: data.createdBy,
                };
            } else {
                const imagePath = `uploads/images/${req.file.filename}`;
                updatePost = {
                  title: data.title,
                  description: data.description,
                  image: imagePath,
                  content: data.content,
                  createdBy: data.createdBy,
                };
            }
            const isUpdated = await db.Post.update( updatePost, { where: { id: id } })
            if (isUpdated > 0) {
                const postUpdated = await db.Post.findOne({ where: { id: id } })
                res.status(200).json(postUpdated);
            } else {
                res.status(404).json({ error: 'No Post Found' });
            }
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    delete: async (req, res) => { 
        try {
            const id = req.params.id;
            const updatePost = await db.Post.update({deleted: true}, { 
                where: { id: id },
            });
            if (updatePost > 0) {
                const post = await db.Post.findOne({ where: { id: id } })
                res.status(200).json(post);
            } else {
                res.status(404).json({ error: 'No Post Found' });
            }
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    restore: async (req, res) => {
        try {
            const id = req.params.id;
            const updatePost = await db.Post.update({deleted: false}, { 
                where: { id: id },
            });
            if (updatePost > 0) {
                const post = await db.Post.findOne({ where: { id: id } })
                res.status(200).json(post);
            } else {
                res.status(404).json({ error: 'No Post Found' });
            }
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    destroy: async (req, res) => { 
        try {
            const id = req.params.id;
            const deleted = await db.Post.destroy({ 
                where: { id: id },
            });
            if (deleted) res.status(200).json('Deleted');
            else res.status(404).json({ error: 'No Post Found' });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
}

module.exports = PostController;