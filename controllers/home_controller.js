const Habit = require('../models/habit');

module.exports.home = async (req,res) => {
   console.log("Home controller Of the users controller ********* Now this")
   if(req.isAuthenticated()){
        const habits = await Habit.find({
        user:req.user.id

        })
        return res.render('dashboard', {
            title: "Dashboard",
            habits:habits
        });
    }
    return res.render('user_sign_in', {
        title: "Sign In"
    });
}