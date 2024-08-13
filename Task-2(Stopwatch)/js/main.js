//=========================== StopWatch ========================
let startBtn = document.getElementById('start');
let resetBtn = document.getElementById('reset');

let hour = 0;
let min = 0;
let sec = 0;
let count = 0;
let lap = 0;

let timer = false;

startBtn.addEventListener('click', () => {
    timer = true;
    stopWatch();
    $('#start').hide();
    $('#lap').show();
});

$('#lap').click(function () {
    lap++;
    $('.lap').removeClass("active");
    $('.laps').prepend(`
        <div class="lap active">
            <p><span>Lap</span> ${lap}</p>
            <p>${hour} : ${min} : ${sec} : ${count}</p>
        </div>
    `); 
});

resetBtn.addEventListener('click', () => {
    timer = false;
    hour = 0;
    min = 0;
    sec = 0;
    count = 0;
    lap = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
    
    $('.laps').html("");

    $('#start').show();
    $('#lap').hide();
});

function stopWatch() {
    if (timer) {
        count++;
        if (count == 100) {
            sec++;
            count = 0;
        }
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            hour++;
            min = 0;
        }

        let hrString = hour < 10 ? "0" + hour : hour;
        let minString = min < 10 ? "0" + min : min;
        let secString = sec < 10 ? "0" + sec : sec;
        let countString = count < 10 ? "0" + count : count;

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;

        setTimeout(stopWatch, 10);
    }
}

// ========================= TIME =======================================
const addTrailingZero = (num) => num < 10 ? "0" + num : num;

const updateTime = () => {
    const time = new Date();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hour >= 12 ? "PM" : "AM";
    let otherAmpm = hour >= 12 ? "AM" : "PM";

    // Convert 24 hour format to 12 hour format
    hour = hour % 12 || 12;

    hour = addTrailingZero(hour);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hour").html(hour);
    $("#mint").html(minutes);
    $("#second").html(seconds);
    $("#ampm").html(ampm);
    $("#other_ampm").html(otherAmpm);
};

updateTime();
setInterval(updateTime, 1000);

// =========================== Timer ===================
let time = 0;
let timeHour = 0;
let timeMinute = 0;
let timeSecond = 0;
let timeMilliSecond = 0;
let timeInterval;

const getTime = () => {
    time = prompt("Enter your time in minutes");
    time = time * 60;  // Convert time into seconds
    setTime();
};

const setTime = () => {
    timeHour = Math.floor(time / 3600);
    timeMinute = Math.floor((time % 3600) / 60);
    timeSecond = Math.floor(time % 60);

    $('#time_hour').html(addTrailingZero(timeHour));
    $('#time_mint').html(addTrailingZero(timeMinute));
    $('#time_second').html(addTrailingZero(timeSecond));
    $('#time_MiliSecond').html(addTrailingZero(timeMilliSecond));

    TimeUp();
};

const Timer = () => {
    timeMilliSecond--;
    if (timeMilliSecond === -1) {
        timeMilliSecond = 99;
        timeSecond--;
    }
    if (timeSecond === -1) {
        timeSecond = 59;
        timeMinute--;
    }
    if (timeMinute === -1) {
        timeMinute = 59;
        timeHour--;
    }

    $('#time_hour').html(addTrailingZero(timeHour));
    $('#time_mint').html(addTrailingZero(timeMinute));
    $('#time_second').html(addTrailingZero(timeSecond));
    $('#time_MiliSecond').html(addTrailingZero(timeMilliSecond));

    TimeUp();
};

const StartTime = () => {
    if (timeHour === 0 && timeMinute === 0 && timeSecond === 0 && timeMilliSecond === 0) {
        getTime();
    } else {
        timeInterval = setInterval(Timer, 10);
        $('.start_timer').hide();
        $('.stop_timer').show();
    }
};

const StopTimer = () => {
    clearInterval(timeInterval);
    $('.start_timer').show();
    $('.stop_timer').hide();
};

const ResetTimer = () => {
    StopTimer();
    time = 0;
    timeHour = 0;
    timeMinute = 0;
    timeSecond = 0;
    timeMilliSecond = 0;
    setTime();
};

const TimeUp = () => {
    if (timeHour === 0 && timeMinute === 0 && timeSecond === 0 && timeMilliSecond === 0) {
        ResetTimer();
        alert("Time's up!");
    }
};

$('.start_timer').click(StartTime);
$('.stop_timer').click(StopTimer);
$('.reset_timer').click(ResetTimer);

$('.timer_btn').click(function () {
    $('.outer_wrapper > div').hide();
    $('.stop_watch').show();
    $('.type').html("STOPWATCH");
});

$('.stopWatch_btn').click(function () {
    $('.outer_wrapper > div').hide();
    $('.timer_').show();
    $('.type').html("TIMER");
});

$('.back_btn').click(function () {
    $('.outer_wrapper > div').show();
    $('.stop_watch').hide();
    $('.timer_').hide();
    $('.type').html("CLOCK");
});
