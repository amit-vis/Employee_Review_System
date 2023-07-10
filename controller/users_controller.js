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
        
    }
}