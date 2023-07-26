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
        req.flash('success', 'review Submitted')
        return res.redirect('back')
    } catch (error) {
        console.log("Error", error)
        req.flash('error', 'Error in submitting the review');
        return;
    }
}

module.exports.errorPage = function(req,res){
    return res.render('Error', {
        title: "ESR | Error Page"
    })
}

module.exports.deleteReview = async function(req, res){
    try {
        let review = await MyReview.findByIdAndDelete(req.params.id);
        if (review){
            req.flash("success", "review deleted successfully")
            return res.redirect('back')
        }
    } catch (error) {
        req.flash("Error", "Error in review")
        console.log("Error", error)
        
    }
}