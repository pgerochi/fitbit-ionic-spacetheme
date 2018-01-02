import clock from "clock";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { today, goals } from "user-activity"
import * as util from "../common/utils";
import { display } from "display";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
let userMonth = document.getElementById("userMonth");
let userTimeSecond = document.getElementById("userTimeSecond");
let userTime = document.getElementById("userTime");
let userCalories = document.getElementById("userCalories");
let userCaloriesText = document.getElementById("userCaloriesText");
let userSteps = document.getElementById("userSteps");
let amPM = document.getElementById("amPM");

let smallHeart = document.getElementById("smallHeart");
let heartRateInformation = document.getElementById("heartRateInformation");

//Month Array 
let monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

//Day Array 
let dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"];

// Create a new instance of the HeartRateSensor object
let hrm = new HeartRateSensor();
heartRateInformation.innerText = "--";  

// Update the <text> element with the current time
function updateClock() {
  let dayInfo = new Date();
  let hour = dayInfo.getHours() > 12 ? dayInfo.getHours() - 12 : dayInfo.getHours();
  let amPmInfo = dayInfo.getHours() >= 12 ? "PM" : "AM";
  let mins = util.zeroPad(dayInfo.getMinutes());
  let sec = util.zeroPad(dayInfo.getSeconds());

  let day = dayInfo.getDay();
  let month = dayInfo.getMonth();
  let dayOfMonth = dayInfo.getDate();
  userMonth.innerText = `${monthNames[month]} ${dayOfMonth}`;
  userCaloriesText.innerText = dayNames[day];
  userSteps.innerText = today.adjusted.steps;
  
  hour = hour < 10 ? "0" + hour : hour;
  userTime.innerText = `${hour}:${mins}`;
  userTimeSecond.innerText = `${sec}`;
  amPM.innerText = amPmInfo;
}

//Declare heart rate
let hrm = new HeartRateSensor({ frequency: 10, batch: 60 });

// Declare a even handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values
   // Loop through this batch of readings[]
  hrm.readings.forEach(function (reading) {
    //console.log("Current heart rate: " + reading.heartRate);
    heartRateInformation.innerText = reading.heartRate;  
  });
}

// Update the clock every tick event
clock.ontick = () => updateClock();

// Begin monitoring the sensor
hrm.start();

// Don't start with a blank screen
updateClock();

display.onchange = function(event) {
  if (display.on) {
    hrm.start();
  } else {
    hrm.stop();
  }
}
