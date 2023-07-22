const User = require('../model/users');
const MyReview = require('../model/myReview');
const AssignReview = require('../model/assignReview');


module.exports.home = async function (req, res) {
    try {
        let user = await User.findById(req.user.id).populate({
            path: 'assignReview',
            populate:{
                path: 'toUser'
            }}).populate({
                path: 'myReview',
                populate:{
                    path: 'fromUser'
                }
            })
        res.render('home', {
            title: 'ESR | Employee Page',
            user: user
        })

    } catch (error) {
        console.log('Error', error);
        return
    }
}

module.exports.completeReview = async function(req, res){
    try {
        let review = await AssignReview.findOne({fromUser: req.user, toUser: req.body.toUser});
        await User.findByIdAndUpdate(req.user, {$pull: {assignReview: review.id}});
        await AssignReview.findByIdAndDelete(review.id);

        review = await MyReview.create({
            fromUser: req.user,
            toUser: req.body.toUser,
            message: req.body.message
        })

        let user = await User.findById(req.body.toUser);

        user.myReview.push(review);
        user.save();
        return res.redirect('back')
    } catch (error) {
        console.log("Error", error)
    }
}