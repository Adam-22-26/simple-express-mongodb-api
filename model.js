
const {MongoClient} = require("mongodb")
const conn = "mongodb+srv://admin:gF5fwk1frDwWOIC8@chat-app.qogmt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(conn)
const dbName = "chatapp"

const mongo_model = {
    get_users : async(req, res)=>{
        await client.connect()
        const db = client.db(dbName)
        const col = db.collection("users")
        const doc = await col.find({}).toArray();
        // console.log('get uesrs' ,doc)
        res.status(200).send(JSON.stringify(doc))
    },
    add_user : async (req, res)=>{
        await client.connect()
        const db = client.db(dbName)
        const col = db.collection("users")

        // console.log("req.body",req.body)
        const new_user = req.body
        const user = await col.insertOne(new_user)
        res.status(201)
        res.send(user)

    },
    get_user : async(req, res)=>{
        await client.connect()
        const db = client.db(dbName)
        const col = db.collection("users")
        const user = req.body
        const doc = await col.findOne({username: user.username});
        // console.log('get user --------------' ,doc)
        res.status(200).send(JSON.stringify(doc))
    },
    get_groups :async(req, res)=>{
        await client.connect()
        const db = client.db(dbName)
        const col = db.collection("groups")
        const doc = await col.find({}).toArray();
        // console.log('get groups' ,doc)
        res.status(200).send(JSON.stringify(doc))
    },
    get_group : async (req, res)=>{
        await client.connect()
        const db = client.db(dbName)
        const col = db.collection("groups")
        const group = req.body
        const doc = await col.findOne({groupname: group.groupname});
        res.status(200).send(JSON.stringify(doc))
    },

    add_group :async(req, res)=>{
        await client.connect()
        const db = client.db(dbName)
        const col = db.collection("groups")
        const new_group = req.body
        const group = await col.insertOne(new_group)
        res.status(201)
        res.send(new_group)

    },
    get_messages : async(req, res)=>{
        const groupname = req.body.groupname
        await client.connect()
        const db = client.db("messages")
        const col = db.collection(groupname)
        const doc = await col.find({}).toArray();

        console.log('get messages', doc)
        res.status(201)
        res.send(JSON.stringify(doc))

    },
    add_message :async(req, res)=>{
        const message = req.body
        await client.connect()
        const db = client.db("messages")
        const col = db.collection(message.group.groupname);
        const res_msg = await col.insertOne(message)
        console.log('get res_msg', res_msg)
        res.status(201)
        res.send(JSON.stringify(res_msg))
    },
    user_update : async (req, res)=>{
        const update_data = req.body
        await client.connect()
        const db = client.db(dbName)
        const col = db.collection("users");
        const old_user = update_data.existing_user;
        const new_user = update_data.update_user;
        const update = await col.updateOne({username: old_user.username},
            {
                $set:{
                    userID : new_user.userID
                }
            })
        // console.log('update',update)
        res.status(201)
        res.send(JSON.stringify({update:"updated"}))
    },
    delete_group : async(req, res)=>{
        
        console.log('group---', req.body.group.groupname)
        await client.connect()
        const db = client.db(dbName)
        const col = db.collection("groups");
        const delete_group = await col.deleteOne({groupname : req.body.group.groupname})

        const msg_db = client.db("messages")
        msg_db.listCollections().toArray((err, colls)=>{
            if(err) throw err;
            colls.forEach(coll=>{
                if(coll === req.body.group.groupname){
                    msg_db.collection(req.body.group.groupname).drop((err, delOK)=>{
                        if(err) throw err;
                        if(delOK) console.log("colletion delete", req.body.group.groupname)
                    })
                }
            })
            
        })
        res.status(201)
        res.send(JSON.stringify({deleted: delete_group}))
    }
    
}
module.exports = mongo_model

// db.listCollections().toArray(function(err, collInfos) {
//     // collInfos is an array of collection info objects that look like:
//     // { name: 'test', options: {} }
// });