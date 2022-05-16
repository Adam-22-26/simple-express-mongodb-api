const express = require("express")
const controller = require("./controller")

const apiRouter = express.Router()

apiRouter.route("/api/get-users")
.get(controller.user_ctlr)

apiRouter.route("/api/insert-user")
.post(controller.insert_user_ctlr)

apiRouter.route("/api/get-user")
.post(controller.get_user_ctlr)

apiRouter.route("/api/get-groups")
.get(controller.group_ctlr)

apiRouter.route("/api/get-group")
.post(controller.get_group_ctlr)

apiRouter.route("/api/delete-group")
.post(controller.delete_group_ctlr)

apiRouter.route("/api/insert-group")
.post(controller.insert_group_ctlr)

apiRouter.route("/api/get-messages")
.post(controller.message_ctlr)

apiRouter.route("/api/insert-message")
.post(controller.insert_msg_ctlr)

apiRouter.route("/api/update-user")
.post(controller.user_update_ctlr)

module.exports = apiRouter