const listService = require("../service/list-service")

class ListController {
    async addList(req, res, next) {
        try {
            const { listTitle, listItem } = req.body
            const userId = req.user._id

            const listData = await listService.addList(
                listTitle,
                listItem,
                userId
            )
            return res.json(listData)
        } catch (e) {
            next(e)
        }
    }

    async updateList(req, res, next) {
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
