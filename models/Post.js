const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    // add a relationship to users model && getting the user id from User model
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    // added name and avatar again soo when user deletes account, the post will still be available.
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post',PostSchema)