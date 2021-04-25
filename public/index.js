var todayDate = new Date();

var weekday = todayDate.getDay();
var month = todayDate.getMonth();
var day = todayDate.getDate();

var nameOfDays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"); 
var nameOfMonth = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");


$(".date-fp").html(nameOfDays[weekday] + ", " + day + " " + nameOfMonth[month]);

var forecastData = x;
var dailyDataLen = forecastData.length;
var table = "";

for (var i = 0; i < dailyDataLen; i++) {

    var dailyWeekday = forecastData[i].dailyWeekday;
    var dailyDay = forecastData[i].dailyDay;
    var dailyImg = forecastData[i].dailyIcon;
    var dailyTemp = forecastData[i].dailyTemp;
    
    var divOp = '<div class="col forecast">';
    var h4 = "<h5>" + dailyWeekday + " " + dailyDay + "</h5>";
    var img = '<img class="daily-icon" src=' + dailyImg + ">";
    var span = "<h4>" + dailyTemp + "ºC</h></div>";

    table += divOp + h4 + img + span; 
    
}

$(".row").html(table);


