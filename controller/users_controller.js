const User = require("../model/users");
const passport = require('passport');

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

module.exports.employeeSignIn = async function(req, res){
    try {
        return res.render('employee_add', {
            title: 'ESR | Employee Sign In'
        })
    } catch (error) {
        
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
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: true
            })
        }else{
            return res.redirect('back')
        }
        return res.redirect('/user/sign-in')
    } catch (error) {
        console.log("Error", error);
        return;
    }
}

module.exports.createEmployee = async function(req, res){
    try {
        if(req.body.password != req.body.c_password){
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false
            })
        }else{
            return res.redirect('back')
        }
        return res.redirect('/user/sign-in')
    } catch (error) {
        console.log("Error", error);
        return;
    }
}

module.exports.addEmployee = async function(req, res){
    try {
        let user = await User.findById(req.params.id);

        user.isAdmin = false;
        user.save();
        return res.redirect('back');
    } catch (error) {
        console.log('Error', error);
        return;
    }
}

module.exports.createSession = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
      if (err) {
        console.log("Error in passport authentication", err);
        return res.redirect('/user/sign-in');
      }
  
      if (!user) {
        return res.redirect('/user/sign-in');
      }
  
      // Redirect based on isAdmin status
      if (user.isAdmin) {
        return res.redirect('/admin/page'); // Redirect to admin page
      } else {
        return res.redirect('/'); // Redirect to home page (or any other desired route)
      }
    })(req, res, next);
  };

  module.exports.destroySession = function(req, res){
    req.logout(function (error){
        if(error){
            console.log("Error while signing out")
            return res.redirect('back')
        }
        return res.redirect('/user/sign-in')
    })
  }