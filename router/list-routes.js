const Router = require("express").Router
const listController = require("../controllers/list-controller")
const router = new Router()
const { useUserMiddleWare } = require("../middlewares/user-middleware")

router.post("/list", useUserMiddleWare(), listController.addList)
router.put("/list/:id", useUserMiddleWare(), listController.updateList)
router.get("/list", listController.getList)
router.delete("/list/:id", useUserMiddleWare(), listController.deleteList)

module.exports = router
