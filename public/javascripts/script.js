var getCalendar = "https://www.googleapis.com/calendar/v3/calendars/4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com/events?key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M";

var postToCalendar = "https://www.googleapis.com/calendar/v3/calendars/4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com/events/quickAdd?key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M";


$(document).ready(function() {
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

		var valid_articles = {};
		valid_articles.list = [];
		for (var i=0; i < saved_articles.list.length; i++) {
			var reading_time = saved_articles.list[i].reading_time;
			for (var j=0; j < timeDifferences.length; j++) {
				console.log(timeDifferences[j].timeDifference);
				// if (reading_time < timeDifferences[j].)
			}
		}
	});
});
