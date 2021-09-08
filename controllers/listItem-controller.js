const listItemService = require("../service/listItem-service")

class ListItemController {
    async addListItem(req, res, next) {
        try {
            const { name, option, listId } = req.body
            const listItemData = await listItemService.addListItem(
                name,
                option,
                listId
            )
            return res.json(listItemData)
        } catch (e) {
            next(e)
        }
    }

    async updateListItem(req, res, next) {
        try {
            const { name, option, listId } = req.body
            const { id } = req.params
            const listItemData = await listItemService.updateListItem(
                name,
                option,
                listId,
                id
            )
            return res.json(listItemData)
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
            // const {listId} = req.body
            // const userId = req.user._id
            await listItemService.deleteListItem(id)
            return res.json({ message: "ListItem was deleted" })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ListItemController()
