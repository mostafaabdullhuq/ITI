// select required elements
let timeClockElement = document.querySelector("p.time"),
    timeFormatElement = document.querySelector("p.time-format"),
    setAlarm = document.querySelector("button.set-alarm"),
    closeAlarm = document.querySelector("button.close-alarm"),
    alarmTrigger = document.querySelector(".alarm-trigger"),
    alarmOverlay = document.querySelector(".alarm-overlay"),
    alarmIcon = document.querySelector(".clock-icon"),
    alarmNotification = document.querySelector(".alarm-notification"),
    daysContainer = document.querySelector(".days-of-week"),
    clockContainer = document.querySelector(".clock-container");

var alarmEvent,
    stopWatch = 0;

function beep() {
    var snd = new Audio(
        "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
    );
    snd.play();
}

function makeAlarm(alarmInSeconds) {
    // make red alarm circle active
    alarmTrigger.classList.add("active");

    // keep making this event every 1s
    alarmEvent = setInterval(() => {
        console.log(alarmInSeconds);
        // if alarm time is ended
        if (alarmInSeconds === 0) {
            // animate the clock
            clockContainer.classList.add("animate__animated", "animate__shakeX");
            console.log("removed");
            setTimeout(() => {
                clockContainer.classList.remove("animate__animated", "animate__shakeX");
                console.log("added");
            }, 500);
            beep();
        }

        // if the alarm not finished, decrement 1s from the alarm time
        else {
            alarmInSeconds -= 1;
        }
    }, 1000);
}

// update clock periodically every 1 second
setInterval(() => {
    // create new datetime object
    let dateTime = new Date(),
        // get current hour, minute, and second
        hours = dateTime.getHours(),
        minutes = dateTime.getMinutes(),
        seconds = dateTime.getSeconds(),
        // set the time format to AM
        timeFormat = "AM";

    // if the hour value is more than 12 convert it to 12H format and set the timeformat to PM
    if (hours > 12) {
        hours = hours - 12;
        timeFormat = "PM";
    }

    // if the hour is one digit, add the leeding zero to it
    if (hours < 10) {
        hours = "0" + hours;
        if (hours == "00") {
            hours = 12;
        }
    }

    // if the minute is one digit, add the leeding zero to it
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // if the second is one digit, add the leeding zero to it
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    // set the alarm to the HTML
    timeClockElement.textContent = `${hours}: ${minutes}: ${seconds}`;

    // set the timeformat to the HTML
    timeFormatElement.textContent = timeFormat;
}, 500);

// periodically update the Current day of the week every 1s
setInterval(() => {
    // get the number of day in week, starting from sunday
    let day = new Date().getDay() - 1;

    // make the current day element active
    daysContainer.children.item(day).classList.add("active");
}, 1000);

// when red alarm button clicked, add event
alarmTrigger.addEventListener("click", (e) => {
    // if the alarm is already working
    if (alarmTrigger.classList.contains("active")) {
        // remove the alarm active class
        alarmTrigger.classList.remove("active");
        console.log("here");
        // stop the alarm and the peep sound
        clearInterval(alarmEvent);

        // remove the alarm animation
        clockContainer.classList.remove("animate__animated", "animate__shakeX");
        // remove the active class from the clock icon
        alarmIcon.classList.remove("active");
    }
    // if there's no alarms
    else {
        // show the alarm window
        alarmOverlay.classList.add("active");

        // reset the alarm window inputs
        (document.querySelector("input.alarm-hours").value = 0), (document.querySelector("input.alarm-minutes").value = 0), (document.querySelector("input.alarm-seconds").value = 0);
    }
});

// when close alarm button in alarm window clicked
closeAlarm.addEventListener("click", (e) => {
    // hide the alarm window
    alarmOverlay.classList.remove("active");
});

// when set alarm button clicked in alarm window
setAlarm.addEventListener("click", (e) => {
    // get the user entered alarm values
    let hoursValue = document.querySelector("input.alarm-hours").value,
        minutesValue = document.querySelector("input.alarm-minutes").value,
        secondsValue = document.querySelector("input.alarm-seconds").value;

    // if user entered wrong alarm value
    if (hoursValue > 200 || hoursValue < 0 || minutesValue < 0 || secondsValue < 0 || (hoursValue == 0 && minutesValue == 0 && secondsValue == 0)) {
        // show notification to the user for 1.5 second and then hide it
        alarmNotification.textContent = "Please Enter Valid Time.";
        alarmNotification.style.color = "crimson";
        setTimeout(() => {
            alarmNotification.textContent = "Set Alarm Time";
            alarmNotification.style.color = "black";
        }, 1500);
    }
    // if user entered valid alarm time
    else {
        // hide the alarm window
        alarmOverlay.classList.remove("active");

        // make clock icon enabled
        setTimeout(() => {
            alarmIcon.classList.add("active");
        }, 500);
    }
    // calculate the alarm time in seconds
    stopWatch = Number(hoursValue) * 60 * 60 + Number(minutesValue) * 60 + Number(secondsValue);

    // start alarm
    makeAlarm(stopWatch);
});
