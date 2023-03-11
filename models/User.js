const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: { // The purpose of this is to tell the schema how to format the data when it's sent back to us
        virtuals: true, // This tells the schema to include virtual properties when data is requested
        getters: true // This tells the schema to run getters when data is requested. Getters are functions that format the value of a property before it's returned
    },
    id: false // This tells the schema not to create an _id virtual property. We don't need it because MongoDB already creates an _id field for each document
});
