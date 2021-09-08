const ListModel = require("../models/list-model")
const ListItemModel = require("../models/listItem-model")
const UserModel = require("../models/user-model")

class ListItemService {
    async addListItem(name, option, listId) {
        const list = await ListModel.findById(listId)
        if (!list) {
            throw ApiError.BadRequest(`List not found`)
        }
        const listItemData = await ListItemModel.create({
            name,
            option,
            listId,
        })
        list.listItem.push(listItemData._id)
        await list.save()

        return {
            listItemData,
        }
    }

    async updateListItem(name, option, listId, id) {
        const listItemData = await ListItemModel.findByIdAndUpdate(
            { _id: id },
            {
                name,
                option,
                listId,
            },
            { new: true }
        )
        return {
            listItemData,
        }
    }

    async deleteListItem(id, listId) {
        await ListItemModel.findByIdAndDelete(id)
    }
}

module.exports = new ListItemService()
