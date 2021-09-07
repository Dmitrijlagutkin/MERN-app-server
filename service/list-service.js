const ListModel = require("../models/list-model")
const UserModel = require("../models/user-model")

class ListService {
    async addList(listTitle, listItem, userId) {
        const user = await UserModel.findById(userId)
        const listData = await ListModel.create({
            listTitle,
            ...listItem,
        })
        user.lists.push(listData._id)
        await user.save()

        return {
            listData,
        }
    }

    async updateList(listTitle, listItem, id) {
        const listData = await ListModel.findByIdAndUpdate(
            { _id: id },
            {
                listTitle,
                ...listItem,
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
        await user.lists.splice(user.lists.indexOf(id), 1)
        await user.save()
    }
}

module.exports = new ListService()
