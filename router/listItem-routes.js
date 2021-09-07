const Router = require("express").Router
const listItemController = require("../controllers/listItem-controller")
const router = new Router()
const { useUserMiddleWare } = require("../middlewares/user-middleware")

router.post("/listItem", useUserMiddleWare(), listItemController.addListItem)
router.put(
    "/listItem/:id",
    useUserMiddleWare(),
    listItemController.updateListItem
)
router.get("/listItem", listItemController.getListItem)
router.delete(
    "/listItem/:id",
    useUserMiddleWare(),
    listItemController.deleteListItem
)

module.exports = router
