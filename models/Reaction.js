const { Schema, model } = require('mongoose');

// Schema to create reaction model
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId() // This creates a new ObjectId for the reactionId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal) // This is a getter that formats the timestamp on query
    }
},
{
    toJSON: {
        getters: true
    }
});

module.exports = reactionSchema;