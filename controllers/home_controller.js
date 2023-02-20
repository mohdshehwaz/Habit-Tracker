
module.exports.home = (req,res) => {
   console.log("Home controller Of the users controller ********* Now this")
    return res.render('user_sign_in', {
        title: "Sign In"
    });
}