module.exports.home = async function(req, res){
    try {
        return res.render('home', {
            title: 'Home | Employee Review System'
        });
    } catch (error) {
        console.log("error", error);
        return;
    }
}