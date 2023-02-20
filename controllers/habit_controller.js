const Habit = require('../models/habit');

module.exports.add = async (req,res) => {
    console.log("In the habit conroller");
    console.log(req.body);
    console.log(req.user._id);
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
    console.log("days are -> ",days);
    return res.redirect('back');
}
function getD(n) {
    let d = new Date();
    d.setDate(d.getDate() + n);
    
    var newDate = d.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );

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
    return { date: newDate, day };
}
