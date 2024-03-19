const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    description : {
        type: String,
        default: '',
    },
    img_path: {
        type: String,
        default: '',
        required: true
    },
    like: {
        type: Array,
        default: []
    },
    user_id : {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
    },
    profile_picture : {
        type: String,
        default: '',
    },
},{timestamps: true});
module.exports = mongoose.model('posts', PostSchema);