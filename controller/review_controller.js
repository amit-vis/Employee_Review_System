const AssignReview = require('../model/assignReview');
const User = require('../model/users');

module.exports.home = async function(req, res){
    try {
        let user = await User.find({});
        return res.render('review', {
            title: 'ESR | Employee Page',
            user
        })
    } catch (error) {
        console.log("Error", error);
    }
};

module.exports.createReview = async function(req, res){
    try {
        let review = await AssignReview.findOne({fromUser: req.body.reviewer, toUser: req.body.recipient});
        if(review){
            return res.redirect('back');
        }

        review = await AssignReview.create({
            fromUser: req.body.reviewer,
            toUser: req.body.recipient
        })

        let user = await User.findById(req.params.reviewer);

        user.assignReview.push(review);
        user.save();

    } catch (error) {
        console.log("Error", error)
    }
}