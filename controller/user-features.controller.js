const UserFeaturesService = require('../services/user-features.service');

const UserFeaturesController = {
    async createFriendRequest(req, res){
        try{
            res.status(200).json({
                success: true,
                message: 'friend request created successfully',
                user: listingUsers
            })
        }catch(error){
            console.error("Error in creating friend request");
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    async listFriendRequest(req, res){
        try {
            const filter = { is_deleted: false };
            const searchableFields = ["user_id", "phone"];
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
            const listingUsers = await UserFeaturesService.listFriendRequest({
                filter: filter,
                index: index,
                limit: size,
                searchParams: searchParams,
                sort: sort,
            });

            res.status(200).json({
                success: true,
                message: 'request listed successfully',
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
    async updateFriendRequest(req, res){
        try {
            const data = req.body;
            const id = req.body._id;
            const updateOptions = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    updateOptions[key] = data[key];
                }
            }

            const updatedData = await UserFeaturesService.updateFriendRequest({ updateOptions, id })
            res.status(200).json({
                success: true,
                message: 'request updated successfully',
                user: updatedData
            });
        } catch (error) {
            throw error;
        }
    },
    async deleteFriendRequest(req, res){
        try {
            const id = req.query._id;
            const data = await UserFeaturesService.deleteFriendRequest(id);
            res.status(200).json({
                success: true,
                message: 'request deleted successfully',
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
    
    async friendApprovalStatus(req, res){
        try{
            const data = req.body;
            const id = req.body._id;
            const updateOptions = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    updateOptions[key] = data[key];
                }
            }
            const updatedData = await UserFeaturesService.updateFriendRequest({ updateOptions, id });
            res.status(200).json({
                success: true,
                message: 'feedback by friend successfully',
                user: updatedData
            })
        }catch(error){
            console.error("Error in approving request", error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,

            })
        }
    }
};
module.exports = UserFeaturesController;