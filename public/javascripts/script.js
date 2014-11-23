var calendarLink = "https://www.googleapis.com/calendar/v3/calendars/4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com/events?key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M";

$.getJSON(calendarLink, function(data) {
	
	var response = data["items"]

	// console.log(response)

	for (var i=0; i < response.length; i++) {

		console.log(moment.utc(moment(response[i]["end"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss").diff(moment(response[i]["start"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss"))).format("HH:mm:ss"))	

	};




});

$(document).ready(function() {
	var reading_time = $('#reading-time').val();
	console.log(reading_time);
});