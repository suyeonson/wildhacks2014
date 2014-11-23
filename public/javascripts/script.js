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
	var saved_articles = {};
	saved_articles.list = [];
	$('.item').each(function(i) {
		var reading_time = $(this).find('#reading-time').text();
		var url = $(this).find('a').attr('href');
		var title = $(this).find('a').text();
		var new_article = {
			'title': title,
			'url': url,
			'reading_time': reading_time
		};
		saved_articles.list.push(new_article);
	});
	console.log(saved_articles);
});
