const jwt = require('jsonwebtoken');
require('dotenv').config();
//const session = require('express-session');
const UserService = require('../services/user.services');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt
const UserController = {
    async createUser(req, res) {
        try {
            const data = req.body;
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            // Replace the plain text password with the hashed one
            data.password = hashedPassword;
            const registration = await UserService.createUser(data);
            res.status(201).json({
                success: true,
                message: 'User created',
                user: registration
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    },

    async getUser(req, res) {
        const query = req.query._id;
        try {
            const data = await UserService.getUser(query);
            res.status(200).json({
                success: true,
                message: 'User retrieved successfully',
                user: data
            });
        } catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    },

    async updateUser(req, res) {
        try {
            const data = req.body;
            const id = req.body._id;
            const updateOptions = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    updateOptions[key] = data[key];
                }
            }

            const updatedData = await UserService.updateUser({ updateOptions, id })
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                user: data
            });
        } catch (error) {
            throw error;
        }
    },

    async deleteUser(req, res) {
        
        try {
            const id = req.query._id;
            const data = await UserService.deleteUser(id);
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                user: data
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    },

    async listUser(req, res) {
        try {
            const filter = { is_deleted: false };
            const searchableFields = ["email", "phone"];
            const query = req.query;
            const page = query.page ? parseInt(query.page) : 1;
            const size = query.size ? parseInt(query.size) : 10;
            const index = page ? (page - 1) * size : 0;
            const sort = { created_at: -1 };
            const searchParams = {};
            if (query.searchField && query.searchValue) {
                searchParams[query.searchField] = {
                    $regex: query.searchValue,
                    $options: "i",
                };
            }
            if (query._id) {
                const { _id } = query;
                filter._id = _id;
            }
            console.log("FILTER", filter, "INDEX", index, "LIMIT", "SIZE", size, "SEARCHPARAMS", searchParams, "SORT", sort)
            const listingUsers = await UserService.listUser({
                filter: filter,
                index: index,
                limit: size,
                searchParams: searchParams,
                sort: sort,
            });

            res.status(200).json({
                success: true,
                message: 'User listed successfully',
                user: listingUsers
            })
        } catch (error) {
            console.error("Error in listing:", error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },

    async userLogin(req, res){
        try{
            const { email, password } = req.body;
            const user = await UserService.getUserByEmail(email);
            if(!user){
                return res.status(401).json({ success: false, message: "Invalid email"});
            }
            console.log("USER PASSWORD", user.password);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Incorrect password' });
            }
            const token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '24h'});
            
            req.session.user = { id: user._id, email: user.email }; 
            
            

            res.status(200).json({ success: true, message: 'User logged in successfully', token });
        }catch(error){
            console.error("getting error in login", error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },

    async logout(req, res){
        try{
        res.status(200).json({ success: true, message: 'User logged out successfully', token });
        }catch(error){
            console.error("Getting error in logging out:", error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
    }
};

module.exports = UserController;

