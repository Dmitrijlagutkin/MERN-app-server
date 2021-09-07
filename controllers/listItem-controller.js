const listItemService = require("../service/listItem-service")

class ListItemController {
    async addListItem(req, res, next) {
        try {
            const { name, listId } = req.body
            const userId = req.user._id

            const listItemData = await listItemService.addListItem(
                name,
                listId,
                userId
            )
            return res.json(listItemData)
        } catch (e) {
            next(e)
        }
    }

    async updateListItem(req, res, next) {
        try {
            const { listTitle, listItem } = req.body
            const { id } = req.params
            const listData = await listService.updateList(
                listTitle,
                listItem,
                id
            )
            return res.json(listData)
        } catch (e) {
            next(e)
        }
    }

    async getListItem(req, res, next) {
        try {
        } catch (e) {}
    }

    async deleteListItem(req, res, next) {
        try {
            const { id } = req.params
            const userId = req.user._id
            await listService.deleteList(id, userId)
            return res.json({ message: "Category was deleted" })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ListItemController()
