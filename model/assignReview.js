const mongoose = require('mongoose');

const assignReviewSchema = new mongoose.Schema({
    fromUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
});

const AssignReview = mongoose.model('AssignReview', assignReviewSchema);
module.exports = AssignReview;