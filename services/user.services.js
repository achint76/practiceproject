const mongoose = require('mongoose');
const UserModel  = require('../models/user.model');

const UserService = {
    async createUser(payload) {
        try {
            const createData = await UserModel.create(payload);
            return createData;
        } catch (error) {
            throw error;
        }
    },

    async getUser(filter) {
        try {
            const getData = await UserModel.findOne(filter);
            return getData;
        } catch (error) {
            throw error;
        }
    },

    async updateUser({ updateOptions, id }) {
        const user = await this.getUser({ _id: id });
        if (!user || user.length === 0) throw new NotFoundError("No user found with the id.");
        const num = await UserModel.updateOne(
            { _id: id },
            { $set: updateOptions },
            { new: true }
        );
        return num;
    },

    async deleteUser(id) {
        const user = await this.getUser({ _id: id });
        if (!user || user.length === 0) throw new NotFoundError("No user found with this id.");
        const deleteData = await UserModel.updateOne(
            { _id: id },
            { $set: { is_deleted: true } },
            { new: true }
        );
        return deleteData;
    },

    async listUser({ filter, index, limit, searchParams = {}, sort = { created_at: -1 } }) {
        try {
            console.log("FILTER", filter, "INDEX", index, "LIMIT" ,"SIZE", "SEARCHPARAMS", searchParams, "SORT", sort)
            const excludedFields = { __v: 0 };
            const query = UserModel.find(filter).select(excludedFields);
            const data = await query.sort(sort).skip(index).limit(limit).lean();
            const count = await UserModel.countDocuments(filter);
            console.log(data,"DATA", count, "COUBT")
            return { data, count };
        } catch (error) {
            throw error;
        }
    },

    async userLogin(email, password){
        try {
            const user = await UserService.getUserByEmail(email);
            if (!user) {
                return { success: false, message: "Invalid email" };
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { success: false, message: 'Incorrect password' };
            }
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
            return { success: true, message: 'User logged in successfully', token, userId: user._id };
        } catch (error) {
            console.error("Error logging in:", error);
            throw new Error("Internal Server Error");
        }
    },

    async getUserByEmail(e_mail){
        try{
            const isEmail = await UserModel.findOne({ email: e_mail});
            return isEmail;
            
        }catch(error){
            console.error("Getting error in getting  the email", error);
            throw new Error("Internal Server Error");
        }
    }
};

module.exports = UserService;
