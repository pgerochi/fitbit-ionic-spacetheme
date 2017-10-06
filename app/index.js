'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var clock = _interopDefault(require('clock'));
var document = _interopDefault(require('document'));
var heartRate = require('heart-rate');
var userActivity = require('user-activity');

function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

clock.granularity = "minutes";
var userMonth = document.getElementById("userMonth");
var userTime = document.getElementById("userTime");
var userCalories = document.getElementById("userCalories");
var smallHeart = document.getElementById("smallHeart");
var heartRateInformation = document.getElementById("heartRateInformation");
var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];
var hrm = new heartRate.HeartRateSensor();
function updateClock() {
    var dayInfo = new Date();
    var hours = dayInfo.getHours();
    var mins = zeroPad(dayInfo.getMinutes());
    var day = dayInfo.getDay() + 1;
    var month = dayInfo.getMonth();
    userMonth.innerText = monthNames[month] + " " + day;
    userTime.innerText = hours + ":" + mins;
    userCalories.innerText = userActivity.today.adjusted.steps;
}
var hrm = new heartRate.HeartRateSensor({ frequency: 10, batch: 60 });
hrm.onreading = function () {
    console.log("Current heart rate: " + hrm.heartRate);
    heartRateInformation.innerText = hrm.heartRate;
};
hrm.start();
clock.ontick = function () { return updateClock(); };
updateClock();
