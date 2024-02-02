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
        try{
            
        }catch(error){
            throw error;
        }
    }
};

module.exports = UserService;
