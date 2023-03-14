const { Schema, model,} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
const mongoose = require('mongoose');


// Schema to create thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal) // This is a getter that formats the timestamp on query.
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Virtual to get the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Initialize our Thought model with the thoughtSchema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
