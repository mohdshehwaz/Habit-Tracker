const User = require('../models/user');

module.exports.profile = function(req, res){
    console.log("In the user profile page")
    return res.render('user_profile', {
        title: 'User Profile',
        
    });

}


// render the sign up page
module.exports.signUp = function(req, res){
   
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}
// sign up for the user
module.exports.create_user =async (req,res) => {
    try{
        // first check password is match with the confirm password
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        // find the user by his email id
        const user = await User.findOne({email:req.body.email});
        // if user does not exists in our database than we can regisster this user
        if(!user){
            console.log("users are ->",req.body);
            const newUser = await User.create(req.body);
            if(newUser){
                return res.redirect('/users/sign-in');
            }
            return res.redirect('back');
        }
        return res.redirect('back');
    }
    catch(err){
        return res.redirect('back');
    }
    
}
module.exports.dashboard = async (req,res) => {
    
    return res.render('dashboard', {
        title: "Dashboard"
    });
}
module.exports.createSession = async (req,res) => {
    // try{
    //     const user =await User.findOne({email:req.body.email});

    //     if(user){
    //         if(user.password != req.body.password){
    //             return res.redirect('back');

    //         }
    //         console.log("In the create session page");
    //         res.cookies('user_id',user.id);
    //         return res.redirect('/users/profile');
    //     }
    //     return res.redirect('back');
    // }
    // catch(err){
    //     return res.redirect('back');
    // }
    req.flash('success','Logged in Successfully');
    return res.redirect('/users/dashboard');
    

}
module.exports.destroySession =  function(req, res,next){
    req.flash('success','You have Logged out');
    req.session.destroy();
    
    return res.redirect('/');
}