var calendarLink = "https://www.googleapis.com/calendar/v3/calendars/4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com/events?key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M";




$.getJSON(calendarLink, function(data) {
	
	var response = data["items"]

	var timeDifferences = [];

	console.log(response)

	for (var i=0; i < response.length-1; i++) {

		if (response[i+1]["end"]["dateTime"].split("T")[0] == response[i]["start"]["dateTime"].split("T")[0]) {
			timeDifferences.push({
				"startId": response[i]["id"],
				"endId": response[i+1]["id"],
				"timeDifference": moment.utc(moment(response[i+1]["start"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss").diff(moment(response[i]["end"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss"))).format("HH:mm:ss")
			});
		}; 
	};

console.log(timeDifferences)
});

$(document).ready(function() {
	var reading_time = $('#reading-time').val();
	console.log(reading_time);
});
