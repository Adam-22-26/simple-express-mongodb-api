const mongo_model = require("./model")

const controller = {
    user_ctlr : (req, res)=>{
        mongo_model.get_users(req, res)
    },
    insert_user_ctlr : (req, res)=>{
        mongo_model.add_user(req, res)
    },
    get_user_ctlr : (req, res)=>{
        mongo_model.get_user(req, res)
    },
    group_ctlr :(req, res)=>{
        mongo_model.get_groups(req, res)
    },
    get_group_ctlr : (req, res)=>{
        mongo_model.get_group(req, res)
    },
    insert_group_ctlr : (req, res)=>{
        mongo_model.add_group(req, res)
    },
    message_ctlr : (req, res)=>{
        mongo_model.get_messages(req, res)
    },
    insert_msg_ctlr : (req, res)=>{
        mongo_model.add_message(req, res)
    },
    user_update_ctlr :(req, res)=>{
        mongo_model.user_update(req, res)
    },
    delete_group_ctlr : (req, res)=>{
        mongo_model.delete_group(req, res)
    }
}
module.exports = controller



