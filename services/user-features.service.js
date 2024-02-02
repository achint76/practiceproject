const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const UserService = require('../services/user.services');
const FriendRequestModel = require('../models/friendrequest.model');
const UserFeaturesService = {
    async createFriendRequest(payload){
        try {
            const createData = await FriendRequestModel.create(payload);
            return createData;
        } catch (error) {
            throw error;
        }
    },
    async updateFriendRequest({ updateOptions, id}){
        // const user = await UserFeaturesService.getUser({ _id: id });
        // if (!user || user.length === 0) throw new NotFoundError("No user found with the id.");
        const num = await FriendRequestModel.updateOne(
            { _id: id },
            { $set: updateOptions },
            { new: true }
        );
        return num;
    },
    async listFriendRequest({ filter, index, limit, searchParams = {}, sort = { created_at: -1 } }){
        try {
            console.log("FILTER", filter, "INDEX", index, "LIMIT" ,"SIZE", "SEARCHPARAMS", searchParams, "SORT", sort)
            const excludedFields = { __v: 0 };
            const query = FriendRequestModel.find(filter).select(excludedFields);
            const data = await query.sort(sort).skip(index).limit(limit).lean();
            const count = await FriendRequestModel.countDocuments(filter);
            console.log(data,"DATA", count, "COUBT")
            return { data, count };
        } catch (error) {
            throw error;
        }
    },
    async deleteFriendRequest(id){
        const user = await UserService.getUser({ _id: id });
        if (!user || user.length === 0) throw new NotFoundError("No user found with this id.");
        const deleteData = await UserModel.updateOne(
            { _id: id },
            { $set: { is_deleted: true } },
            { new: true }
        );
        return deleteData;
    }
}
module.exports = UserFeaturesService;