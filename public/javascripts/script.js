var getCalendar = "https://www.googleapis.com/calendar/v3/calendars/4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com/events?key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M";

var postToCalendar = "https://www.googleapis.com/calendar/v3/calendars/4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com/events/quickAdd?key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M";



// ?text={QUICK_ADD_TEXT}&key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M

$.getJSON(getCalendar, function(data) {
	
	var response = data["items"]

	var timeDifferences = [];

	// console.log(response)

	for (var i=0; i < response.length-1; i++) {

		if (response[i+1]["end"]["dateTime"].split("T")[0] == response[i]["start"]["dateTime"].split("T")[0]) {


			var startTime = moment(response[i+1]["start"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss")

			var endTime = moment(response[i]["end"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss")

			timeDifferences.push({
				"startId": response[i]["id"],
				"endId": response[i+1]["id"],
				"timeDifference": moment.duration(startTime.diff(endTime)).asMinutes()
			});
		}; 
	};

	console.log(timeDifferences);
});

// var params = {
// 	"text": "thing at 11/23 10 - 10:15 am"
// };

// xmlhttp = new XMLHttpRequest();
// xmlhttp.open("POST", postToCalendar, true);
// xmlhttp.setRequestHeader("Content-type", "text/plain");




// xmlhttp.send("text=thing+at+11%2F23+10+-+10%3A30+am")

$(document).ready(function() {
	var reading_time = $('#reading-time').val();
	console.log(reading_time);
});
