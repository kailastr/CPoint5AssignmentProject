const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    ItemName: {
        type: String,
        required: true
    },
    ImageURL: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    IsQuantityInWeight: {
        type: Boolean,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }

},
    {
        timestamps: true
    });

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;

// module.exports = mongoose.model("Items", ItemSchema);