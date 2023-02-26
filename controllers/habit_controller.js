const Habit = require('../models/habit');
//add the habit
module.exports.add = async (req,res) => {
    try{
        let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
    console.log(localISOTime);

    var days = [];
    days.push(getD(0));
    days.push(getD(1));
    days.push(getD(2));
    days.push(getD(3));
    days.push(getD(4));
    days.push(getD(5));
    days.push(getD(6));
    
    const habit = await Habit.create({
        name:req.body.habit,
        user:req.user._id,
        category:req.body.category,
        dates:days,
        count:0
    });  
    
    if(habit){
        const habits = await Habit.find({});
        console.log(habits);
        return res.redirect('back');
        // return res.render('/',{
        //     title:"Daily Habits",
        //     habits:habits, 
        // });
    }
    return res.redirect('back');
    }
    catch(err){
        console.log(err); 
        return res.redirect('back');
      
    }
    
}
// get the next seven days
function getD(n) {
    let d = new Date();
    d.setDate(d.getDate() + n);

    var newDate = d.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );
    var complete = "none";
    var day;
    switch (d.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }
    return { date: newDate, day,complete };
}
// delete the habit
module.exports.delete = async (req,res) => {
    try{
        console.log(req.params.id);
        const habit = await Habit.findById(req.params.id);
        if(habit){
            habit.remove();
            return res.redirect('back');
        }
    return res.redirect('back');
    }
    catch(err){
        return res.redirect('back');
    }
}
// see all the details of the habit 
module.exports.details = async (req,res) => {
    console.log("In the details of the habit page");
    const habit = await Habit.findById(req.params.id);
    if(habit){
        return res.render('details',{
            title:"Details",
            habit:habit
        })
    }
    return res.redirect('back');
}
// update the habit 
module.exports.update = async (req,res) => {

    console.log(req.params.id);
    console.log("query of this route is -> ",req.query.status);
    console.log("date id -> ", req.params.date_id);
    const habit = await Habit.findById(req.params.id);
    if(habit){
        const selectDate  = habit.dates.find(date => req.params.date_id === date.id );
        console.log(selectDate);
        selectDate.complete = req.query.status;
        if(req.query.status == "yes"){
            habit.count += 1;
        }
        else{
            if(habit.count >0 && req.query.status == 'no' ){
                habit.count -= 1;
            }
            
        }
        
        habit.save();
        return res.redirect('back');
    }
    return res.redirect('back');

}