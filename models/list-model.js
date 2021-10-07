const { Schema, model } = require("mongoose")

const List = new Schema({
    listTitle: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String},
    listItem: [{ type: Schema.Types.ObjectId, ref: "ListItem" }],
})

module.exports = model("List", List)
