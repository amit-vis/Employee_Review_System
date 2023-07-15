const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: true
    },
    assignReview:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssignReview'
        }
    ],
    myReview:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MyReview'
        }
    ]
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;