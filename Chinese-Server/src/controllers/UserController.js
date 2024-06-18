const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const UserController = {
    getAll: (req, res) => {
       
    },

    getById: (req, res) => {
       
    },

    create: async (req, res) => {
        try {
            // check xem email đã tồn tại hay chưa
            const data = req.body;
            const user = await db.User.findOne({ where: { email: data.email } });
            if (user === null) {
                const hashPassword = await bcrypt.hash(data.password, 10);  
                const newUser = await db.User.create({
                    name: data.name,
                    email: data.email,
                    password: hashPassword,
                    avatar: data.avatar,
                    role: data.role, 
                })
                return res.status(201).json(newUser);
            } else {
                return res.status(500).json({error: 'User already exists!'});
            }
            
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    update: async function (req, res) {
        try {
            const data = req.body;
            const id = req.params.id;
            let hashPassword;
            let updateUser;
            if (data.password !== undefined) {
                hashPassword = await bcrypt.hash(data.password, 10);  
                updateUser = await db.User.update({
                    ...data,
                password: hashPassword }, { where: { id: id },
                });
            } else {
                updateUser = await db.User.update(data, { where: { id: id }} );
            }
           
            if (updateUser > 0) {
                const user = await db.User.findOne({ where: { id: id } })
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ error: 'No User Found' });
            }
        } catch (error) {
            console.error('Error creating post:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Auth functions
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await db.User.findOne({ where: { email: email } });
            if (!user)
                return res.status(401).json({
                    status: "failed",
                    data: null,
                    message: "Invalid email. Please try again with the correct credentials.",
                });

            // Tìm thấy tài khoản, so sánh mật khẩu
            const isSamePassword = bcrypt.compareSync(password, user.password);
            if (isSamePassword) {
                const accessToken = UserController.generateAccessToken(user); 
                // const refreshToken = UserController.generateRefreshToken(user);
                // user.refreshTokens.push(refreshToken);
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite:"strict"
                });
                // set user.accessToken = accessToken
                await db.User.update({accessToken: accessToken}, {where: {id: user.id}});
                const updatedUser = await db.User.findOne({ where: { id: user.id } })
                return res.status(200).json({
                    status: "success",
                    data: updatedUser,
                    message: "You have successfully logged in.",
                });
            } else {
                return res.status(401).json({ 
                    status: "failed",
                    data: [],
                    message: "Invalid password. Please try again with the correct credentials.",
            });
            }
        } catch (err) {
            return res.status(500).json({
                status: "error",
                data: null,
                message: "Internal Server Error",
            });
        }
    },

    logout: async (req, res) => {
        // const user = req.user;
        const user = db.User.findOne({ _id: req.user._id});
        if (!user) return res.status(204).json('No content!');

        // set user.accessToken = ''
        await db.User.update({accessToken: ''}, {where: {id: user.id}});

        res.setHeader('Clear-Site-Data', '"cookies"');
        return res.status(200).json({ message: 'You are logged out!' });
    },
    

    // Tạo accessToken 
    generateAccessToken: (user) => {
        const accessToken = jwt.sign({ 
            id: user.id, email: user.email 
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn:'2h' });
        return accessToken;
    },

    // // Tạo refreshToken
    // generateRefreshToken: (user) => {
    //     const refreshToken = jwt.sign({
    //         id: user.id, email: user.email
    //     }, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'7d'} );
    //     return refreshToken;
    // },
}

module.exports = UserController;