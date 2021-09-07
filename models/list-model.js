const { Schema, model } = require("mongoose")

const List = new Schema({
    listTitle: { type: String, required: true },
    listItem: [{ type: Schema.Types.ObjectId, ref: "ListItem" }],
})

module.exports = model("List", List)
