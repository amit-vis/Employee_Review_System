const User = require('../model/users');
const queue = require('../config/kue');
const crypto = require('crypto');
const create = require('connect-mongo');
const resetWorkers = require('../workers/reset_mail_workers');
const Reset = require('../model/reset');



module.exports.forgotGet = function(req, res){
    return res.render('forgot', {
        title: 'ESR | Forgot Password'
    })
}

module.exports.passwordReset = async function(req, res){
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            const resetVerify = await Reset.create({
                email: req.body.email,
                isValid: true,
                acessToken: crypto.randomBytes(20).toString('hex')
            });
            const job = queue.create('reset', resetVerify).save(function(err){
                if(err){
                    console.log("Error", err)
                }
                console.log('job enqued', job.id)
                return res.redirect('back')
            })
        }else{
            return res.redirect('/user/sign-up')
        }
    } catch (error) {
        console.log("error", error);
        
    }
}