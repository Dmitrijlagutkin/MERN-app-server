const ListModel = require("../models/list-model")
const UserModel = require("../models/user-model")
const ApiError = require("../exceptions/api-error")
class ListService {
    async addList(listTitle, date, category, listItem, isFavorites, userId) {
        const user = await UserModel.findById(userId)
        if (!user) {
            throw ApiError.BadRequest(`User not found`)
        }
        const listData = await ListModel.create({
            listTitle,
            date,
            category,
            listItem,
            isFavorites
        })
        user.lists.push(listData._id)
        await user.save()

        return {
            listData,
        }
    }

    async updateList(listTitle, date, category, listItem, id) {
        const listData = await ListModel.findByIdAndUpdate(
            { _id: id },
            {
                listTitle,
                date,
                category,
                listItem,
                isFavorites
            },
            { new: true }
        )
        return {
            listData,
        }
    }

    async deleteList(id, userId) {
        await ListModel.findByIdAndDelete(id)
        const user = await UserModel.findById(userId)
        if (!user) {
            throw ApiError.BadRequest(`User not found`)
        }
        await user.lists.splice(user.lists.indexOf(id), 1)
        await user.save()
    }
}

module.exports = new ListService()
