const { Schema, model } = require("mongoose")

const List = new Schema({
    listTitle: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String},
    listItem: [{}],
    isFavorites: {type: Boolean, default: false}
})

module.exports = model("List", List)
