const user = require('../model/users');
const AssignReview = require('../model/assignReview');
const MyReview = require('../model/myReview');

module.exports.home = async function(req, res){
    try {
        let
        return res.render('home', {
            title: 'Home | Employee Review System'
        });
    } catch (error) {
        console.log("error", error);
        return;
    }
}