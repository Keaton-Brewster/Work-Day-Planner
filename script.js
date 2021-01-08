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
        arrayOfHours = [nine, ten, eleven, twelve, one, two, three, four, five],
        numberOfHours = 9,
        saveIcon = $("i"),
        saveBtn = $(".saveBtn"),
        saveAllBtn = $("#saveAll"),
        clearAllBtn = $("#clearAll");

    const timeFormat = 'HH:mm:ss';

    // this interval updates the todo list every second so that it is always accurate as to which hour is past, present, or future
    function checkTime(box, hourStart, hourEnd) {
        if (
            moment().isAfter(moment(hourStart, timeFormat)) && moment().isAfter(moment(hourEnd, timeFormat))
        ) {
            box.addClass("past");
        }
        if (
            moment().isAfter(moment(hourStart, timeFormat)) && moment().isBefore(moment(hourEnd, timeFormat))
        ) {
            box.addClass("present");
        }
        if (
            moment().isBefore(moment(hourStart, timeFormat)) && moment().isBefore(moment(hourEnd, timeFormat))
        ) {
            box.addClass("future");
        }
    };


    // This function is what will save your text to local storage, so that it can be retrieved by the populate function
    function save(event) {
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
    };

    function populate() {
        for (let i = 0; i < numberOfHours; i++) {
            var index = i + 9,
                itemToPop = JSON.parse(localStorage.getItem(index));
            if (itemToPop) {
                $('textarea[index=' + index + ']').eq(0).val(itemToPop.text);
            }
        }
    };

    // initializing function, run on page load. 
    populate();

    // set up time on top of the page
    setInterval(() => {
        timedisplay.html(moment().format('MMMM Do YYYY, h:mm:ss a'));
        checkTime(nine, '09:00:00', '09:59:59');
        checkTime(ten, '10:00:00', '10:59:59');
        checkTime(eleven, '11:00:00', '11:59:59');
        checkTime(twelve, '12:00:00', '12:59:59');
        checkTime(one, '13:00:00', '14:59:59');
        checkTime(two, '14:00:00', '14:59:59');
        checkTime(three, '15:00:00', '15:59:59');
        checkTime(four, '16:00:00', '16:59:59');
        checkTime(five, '17:00:00', '17:59:59');
    }, 1000);

    // then the event listeners for the save buttons
    saveBtn.on("click", save);
    saveIcon.on("click", save)

    // event listener for save all button
    saveAllBtn.on("click", function () {
        for (let i = 0; i < numberOfHours; i++) {
            var index = i + 9;
            var textToSave = $('textarea[index=' + index + ']').eq(0).val();
            var objectToSave = {
                index: index,
                text: textToSave
            }
            localStorage.setItem(index, JSON.stringify(objectToSave));
        }
    });

    // event listener for clear all button
    clearAllBtn.on("click", function (event) {
        event.preventDefault();
        for (let i = 0; i < numberOfHours; i++) {
            var index = i + 9;
            $('textarea[index=' + index + ']').eq(0).val('');
            var objectToSave = {
                index: index,
                text: ''
            }
            localStorage.setItem(index, JSON.stringify(objectToSave));
        }
    })
});