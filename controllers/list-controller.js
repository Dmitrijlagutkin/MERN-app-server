const listService = require("../service/list-service")

class ListController {
    async addList(req, res, next) {
        try {
            const { listTitle, date, category, listItem, isFavorites } = req.body
            const userId = req.user._id
            console.log("listItem", listItem)
            const listData = await listService.addList(
                listTitle,
                date,
                category,
                listItem,
                isFavorites,
                userId
            )
            return res.json(listData)
        } catch (e) {
            next(e)
        }
    }

    async updateList(req, res, next) {
        try {
            const { listTitle, date, category, listItem, isFavorites } = req.body
            const { id } = req.params
            const listData = await listService.updateList(
                listTitle,
                date,
                category,
                listItem,
                isFavorites,
                id
            )
            return res.json(listData)
        } catch (e) {
            next(e)
        }
    }

    async getList(req, res, next) {
        try {
        } catch (e) {}
    }

    async deleteList(req, res, next) {
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

module.exports = new ListController()
