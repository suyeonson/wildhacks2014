var calendarLink = "https://www.googleapis.com/calendar/v3/calendars/4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com/events?key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M";

$.getJSON(calendarLink, function(data) {
	
	var response = data["items"]



	// for (var i=0; i < response.length; i++) {
	// 	console.log(response[i]["start"] - response[i]["end"])

	// };




});

