const { Schema, model } = require("mongoose")

const ListItem = new Schema({
    name: { type: String, required: true },
    option: { type: String },
    listId: { type: Schema.Types.ObjectId, ref: "List" },
})

module.exports = model("ListItem", ListItem)
