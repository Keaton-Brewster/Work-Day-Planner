$(document).ready(function () {


    var timedisplay = $("#currentDay"),
        nine = $("#9am"),
        ten = $("#10am"),
        eleven = $("#11am"),
        twelve = $("#12pm"),
        one = $("#1pm"),
        two = $("#2pm"),
        three = $("#3pm"),
        four = $("#4pm"),
        five = $("#5pm"),
        numberOfHours = 9,
        saveBtn = $("i");

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


    function populate() {
        for (let i = 0; i < numberOfHours; i++) {
            var index = i + 9,
                itemToPop = JSON.parse(localStorage.getItem(index));
            console.log(itemToPop);
            if (itemToPop) {
                $('textarea[index=' + index + ']').eq(0).val(itemToPop.text);
            }
        }
    }

    // This function is what will save your text to local storage, so that it can be retrieved by the populate function
    saveBtn.on("click", function (event) {
        event.preventDefault();
        var index = $(this).attr("index");
        // for some reason, this jQuery selector always returns an array. to get around that, I had to use
        // .eq(0) (because it was always the only thing in the array).
        var textToSave = $('textarea[index=' + index + ']').eq(0).val();
        var objectToSave = {
            index: index,
            text: textToSave
        }
        localStorage.setItem(index, JSON.stringify(objectToSave));
    });


    // populate preciously saved items
    populate();


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



});