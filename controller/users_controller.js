const User = require("../model/users");

module.exports.signIn = async function(req, res){
    try {
        return res.render('user_sign_in', {
            title: "Employee Review System | Sign In"
        })
        
    } catch (error) {
        console.log("Error", error);
        return;
        
    }
}

module.exports.signUp = async function(req, res){
    try {
        return res.render('user_sign_up', {
            title: "Employee Review System | Sign Up"
        })
    } catch (error) {
        console.log("Error", error);
        return;
    }
}

module.exports.create = async function(req, res){
    try {
        if(req.body.password != req.body.c_password){
            return res.redirect('back');
        }
        let createUser = await User.findOne({email: req.body.email});
        if(!createUser){
            await User.create(req.body);
        }else{
            return res.redirect('back');
        }
        return res.redirect('/user/sign-in');
    } catch (error) {
        console.log("Error", error)
        
    }
}

module.exports.createSession = async function(req, res){
    return res.redirect('back')
}