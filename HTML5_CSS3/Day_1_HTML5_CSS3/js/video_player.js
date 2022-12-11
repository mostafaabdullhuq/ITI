let videoElement = document.querySelector("video"),
    progress = document.querySelector(".time-progress"),
    playPause = document.querySelector(".play-pause-video i"),
    pause = document.querySelector(".pause-video i"),
    backward = document.querySelector(".backward i"),
    backwardStep = document.querySelector(".backward-step i"),
    forwardStep = document.querySelector(".forward-step i"),
    forward = document.querySelector(".forward i"),
    volumeIcon = document.querySelector(".volume-control i"),
    volumeRange = document.querySelector(".volume-control input"),
    speedIcon = document.querySelector(".playback-control i"),
    speedRange = document.querySelector(".playback-control input"),
    maximize = document.querySelector(".view-control i"),
    videoDuration = 0,
    videoMinutes = 0,
    videoSeconds = 0,
    videoHours = 0,
    playedHours = 0,
    playedMinutes = 0,
    playedSeconds = 0,
    currentVideoTime = 0;

// set the video volume to 50% and the volume range value to 50%
videoElement.volume = 0.5;
volumeRange.value = 50;

// when play or pause element clicked
playPause.addEventListener("click", (e) => {
    // if video is paused
    if (videoElement.paused) {
        // play the video
        videoElement.play();
        // change the icon to pause
        playPause.className = "fa-solid fa-pause";
    }
    // if video is playing
    else {
        // pause the video
        videoElement.pause();
        // change the icon to play
        playPause.className = "fa-solid fa-play";
    }
});

// while video in playing process
videoElement.addEventListener("timeupdate", (e) => {
    // calculate the current played video time in Hours:Minutes:Seconds
    currentVideoTime = videoElement.currentTime;
    playedMinutes = Math.floor(currentVideoTime / 60);
    playedSeconds = Math.round(currentVideoTime % 60);
    playedHours = Math.floor(playedMinutes / 60);
    playedMinutes = playedMinutes - videoHours * 60;

    // add leading zeros to time if needed
    playedHours < 10 ? (playedHours = "0" + playedHours) : playedHours;
    playedMinutes < 10 ? (playedMinutes = "0" + playedMinutes) : playedMinutes;
    playedSeconds < 10 ? (playedSeconds = "0" + playedSeconds) : playedSeconds;

    // get the current % of the played time and update the progress bar value
    progress.value = Math.round((videoElement.currentTime / videoDuration) * 100);

    // update the progress bar label
    progress.setAttribute("data-label", `${playedHours}:${playedMinutes}:${playedSeconds} / ${videoHours}:${videoMinutes}:${videoSeconds}`);

    // if video finished plating, convert the pause button to play button
    if (playedMinutes === videoMinutes && playedSeconds === videoSeconds && playedHours === videoHours) {
        playPause.className = "fa-solid fa-play";
    }
});

// when video meta data is loaded
videoElement.addEventListener("loadedmetadata", (e) => {
    // get video time duration in videoSeconds
    videoDuration = videoElement.duration.toFixed();

    // if there's no error with the video
    if (!videoDuration.isNaN) {
        // calculate the video time in Hours:Minutes:Seconds
        videoMinutes = Math.floor(videoDuration / 60);
        videoSeconds = videoDuration % 60;
        videoHours = Math.floor(videoMinutes / 60);
        videoMinutes = videoMinutes - videoHours * 60;
    }
    // add leading zeros to time if needed
    videoHours < 10 ? (videoHours = "0" + videoHours) : videoHours;
    videoMinutes < 10 ? (videoMinutes = "0" + videoMinutes) : videoMinutes;
    videoSeconds < 10 ? (videoSeconds = "0" + videoSeconds) : videoSeconds;

    // update the progress bar label
    progress.setAttribute("data-label", `00:00:00 / ${videoHours}:${videoMinutes}:${videoSeconds}`);
});

// when mute button clicked

volumeIcon.addEventListener("click", (e) => {
    // if video is muted
    if (videoElement.muted) {
        // unmute the video
        videoElement.muted = false;
        // change the icon to volume
        volumeIcon.className = "fa-solid fa-volume-high col-3 d-inline-block";

        // change the volume range value to 100%
        volumeRange.value = 100;
    }
    // if video is not muted
    else {
        // mute the video
        videoElement.muted = true;
        // change the icon to mute
        volumeIcon.className = "fa-solid fa-volume-mute col-3 d-inline-block";

        // set the volume range value to zero
        volumeRange.value = 0;
    }
});

// when volume range value change
volumeRange.addEventListener("change", function () {
    // set the video volume to the range value converted to range [0.0,1.0]
    videoElement.volume = this.value / 100;

    // if volume is muted
    if (videoElement.volume === 0) {
        // change the icon to muteed
        volumeIcon.className = "fa-solid fa-volume-mute col-3 d-inline-block";
    }

    // if volume is higher than 50%
    else if (videoElement.volume > 0.5) {
        // change the icon to high volume
        volumeIcon.className = "fa-solid fa-volume-high col-3 d-inline-block";
    }
    // if volume is less than 50%
    else {
        // change the icon to low volume
        volumeIcon.className = "fa-solid fa-volume-low col-3 d-inline-block";
    }
});

// when backward step button is clicked
backwardStep.addEventListener("click", (e) => {
    // get the first of the video
    videoElement.currentTime = 0;
});

// when backward button is clicked
backward.addEventListener("click", (e) => {
    // go 5 seconds earlier in the video playing time
    videoElement.currentTime -= 5;
});

// when forward step button is clicked
forwardStep.addEventListener("click", (e) => {
    // get the end of the video
    videoElement.currentTime = videoDuration;
});

// when forward button is clicked
forward.addEventListener("click", (e) => {
    // go 5 seconds later in the video playing time
    videoElement.currentTime += 5;
});

// when progress bar clicked
progress.addEventListener("click", function (e) {
    // change the current playing time to the clicked value
    videoElement.currentTime = (videoDuration * e.offsetX) / this.clientWidth;
});

speedIcon.addEventListener("click", function (e) {
    videoElement.playbackRate = 1;
    speedRange.value = 1;
    this.classList.remove("active");
});

speedRange.addEventListener("change", function () {
    videoElement.playbackRate = this.value;
    console.log(this.value);
    if (this.value == 1) {
        speedIcon.classList.remove("active");
    } else {
        speedIcon.classList.add("active");
    }
});

// when video is clicked
videoElement.addEventListener("click", function () {
    // if it is paused
    if (videoElement.paused) {
        // play it and change icon to pause
        videoElement.play();
        playPause.className = "fa-solid fa-pause";
    }
    // if it is playing
    else {
        // pause it and change icon to play
        videoElement.pause();
        playPause.className = "fa-solid fa-play";
    }
});

// when maximize button is clicked
maximize.addEventListener("click", function () {
    // switch to fullscreen mode
    videoElement.requestFullscreen();
});
