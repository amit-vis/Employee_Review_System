const User = require('../model/users');
module.exports.adminPage = async function (req, res) {
    try {
        let employee = await User.find({});
        return res.render('Admin_page', {
            title: 'ESR | Admin Page',
            employee
        });

    } catch (error) {
        console.log("Error", error);
        return;
    }
};

module.exports.makeAdmin = async function (req, res) {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: { isAdmin: true } });
        if (user) {
            req.flash('success', 'Switched to Admin successfully');
            return res.redirect('back')
        }

    } catch (error) {
        console.log("Error", error);
        req.flash('error', 'error in converting into Admin.');
        return;

    }
};

module.exports.removeAdmin = async function (req, res) {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: { isAdmin: false } });
        if (user) {
            req.flash('success', 'Switched to Admin successfully');
            return res.redirect('back')

        }
    } catch (error) {
        console.log("Error", error);
        req.flash('error', 'error in converting into Employee');
        return;
    }
};

module.exports.deleteEmployee = async function (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            req.flash('success', 'Employee Removed successfully')
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error", error);
        req.flash('success', 'Something wrong in removing the employee.')
        return;
    }
}

module.exports.update = async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        if(user.name == req.body.name && user.email == req.body.email && user.password == req.body.password){
            return res.redirect('back');
        }else{
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password

            await user.save();
            req.flash('success', 'Employee details updated successfully')
            return res.redirect('back');

        }
    } catch (error) {
        console.log("Error", error);
        req.flash('error', 'Error in updating the deatils')
        return;
}
}

