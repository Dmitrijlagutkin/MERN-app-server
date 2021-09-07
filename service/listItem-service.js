const ListModel = require("../models/list-model")
const ListItemModel = require("../models/listItem-model")
const UserModel = require("../models/user-model")

class ListItemService {
    async addListItem(name, listId, userId) {
        const list = await ListModel.findById(listId)
        const listItemData = await ListItemModel.create({
            name,
            listId,
        })
        list.listItem.push(listItemData._id)
        await list.save()

        return {
            listItemData,
        }
    }

    async updateListItem(listTitle, listItem, id) {
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

    async deleteListItem(id, userId) {
        await ListModel.findByIdAndDelete(id)

        const user = await UserModel.findById(userId)
        await user.lists.splice(user.lists.indexOf(id), 1)
        await user.save()
    }
}

module.exports = new ListItemService()
