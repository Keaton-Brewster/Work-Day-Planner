var timedisplay = $("#currentDay");


// set up time on top of the page
setInterval(() => {
timedisplay.html(moment().format('MMMM Do YYYY, h:mm:ss a'));
}, 1000);