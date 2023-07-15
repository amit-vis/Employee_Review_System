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

module.exports.createSession = async function(req, res){
    try {
        return res.redirect('/')
    } catch (error) {
        console.log("Error", error);
        return;
    }
};

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