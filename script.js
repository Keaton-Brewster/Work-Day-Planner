var timedisplay = $("#currentDay"),
    nine = $("#9am"),
    ten = $("#10am"),
    eleven = $("#11am"),
    twelve = $("#12pm"),
    one = $("#1pm"),
    two = $("#2pm"),
    three = $("#3pm"),
    four = $("#4pm"),
    five = $("#5pm");

const timeFormat = 'HH:mm:ss';


// this interval updates the todo list every second so that it is always accurate as to which hour is past, present, or future
function checkTime(box, hourStart, hourEnd) {
    setInterval(() => {
        if (
            moment().isAfter(moment(hourStart, timeFormat)) && !moment().isBefore(moment(hourEnd, timeFormat))
        ) {
            box.addClass("past");
        }
        else if (
            moment().isAfter(moment(hourStart, timeFormat)) && moment().isBefore(moment(hourEnd, timeFormat))
        ) {
            box.addClass("present");
        } else if (
            !moment().isAfter(moment(hourStart, timeFormat)) && moment().isBefore(moment(hourEnd, timeFormat))
        ) {
            box.addClass("future")
        }
    }, 1000);
};


// set up time on top of the page
setInterval(() => {
    timedisplay.html(moment().format('MMMM Do YYYY, h:mm:ss a'));
}, 1000);


checkTime(nine, '09:00:00', '10:00:00');
checkTime(ten, '10:00:00', '11:00:00');
checkTime(eleven, '11:00:00', '12:00:00');
checkTime(twelve, '12:00:00', '13:00:00');
checkTime(one, '13:00:00', '14:00:00');
checkTime(two, '14:00:00', '15:00:00');
checkTime(three, '15:00:00', '16:00:00');
checkTime(four, '16:00:00', '17:00:00');
checkTime(five, '17:00:00', '18:00:00');

