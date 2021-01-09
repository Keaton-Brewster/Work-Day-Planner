$(document).ready(function () {

    var timeDisplay = $("#currentDay"),
        numberOfHours = 9,
        saveIcon = $("i"),
        saveBtn = $(".saveBtn"),
        saveAllBtn = $("#saveAll"),
        clearAllBtn = $("#clearAll");

    // this interval updates the todo list every second so that it is always accurate as to which hour is past, present, or future
    function checkTime() {
        for (let i = 0; i < numberOfHours; i++) {
            var currentTime = parseInt(dayjs().format("H")),
                index = i + 9,
                timeBlock = $('textarea[index=' + index + ']');
            // ensure that the timeblock is not holding onto a class preciously set. 
            timeBlock.removeClass('past');
            timeBlock.removeClass('present');
            timeBlock.removeClass('future');
            if (
                currentTime > index
            ) {
                timeBlock.prop('disabled', true);
                timeBlock.addClass('past');
            }
            else if (
                currentTime === index
            ) {
                timeBlock.addClass('present');
            }
            else if (
                currentTime < index
            ) {
                timeBlock.addClass('future');
            };
        };
    };

    // This function is what will save your text to local storage, so that it can be retrieved by the populate function
    function save(event) {
        event.preventDefault();
        var index = $(this).attr('index');
        // jQuery selector always returns an array. to get around that, I had to use
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

    // on page load, and refresh, fill boxes with anything saved to local storage 
    populate();

    // set up time on top of the page
    timeDisplay.html(dayjs().format('MMMM D YYYY, h:mm:ss a'));
    // then start the interval that will update the time display every second - 
    // as well as check which boxes should be past, present, or future, per use of the checkTime() function
    setInterval(() => {
        timeDisplay.html(dayjs().format('MMMM D YYYY, h:mm:ss a'));
        checkTime();
    }, 1000);

    // then the event listeners for the save buttons
    saveBtn.click(save);
    saveIcon.click(save);

    // event listener for save all button
    saveAllBtn.click(function () {
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
    clearAllBtn.click(function (event) {
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