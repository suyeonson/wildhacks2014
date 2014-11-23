var calendarLink = "https://www.googleapis.com/calendar/v3/calendars/4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com/events?key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M";



$(document).ready(function() {
	$.getJSON(calendarLink, function(data) {
		
		var response = data["items"]

		var timeDifferences = [];

		// console.log(response)

		for (var i=0; i < response.length-1; i++) {

			if (response[i+1]["end"]["dateTime"].split("T")[0] == response[i]["start"]["dateTime"].split("T")[0]) {
				timeDifferences.push({
					"startId": response[i]["id"],
					"endId": response[i+1]["id"],
					"timeDifference": moment.utc(moment(response[i+1]["start"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss").diff(moment(response[i]["end"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss"))).format("HH:mm:ss")
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
		
		// console.log(saved_articles);
		console.log(timeDifferences);

		var valid_articles = {};
		valid_articles.list = [];

		var time_diff = ['60', '20', '120'];

		for (var i=0; i < time_diff.length; i++) {
			var diff = time_diff[i];
			console.log("diff: " + diff);
			for (var j=0; j < saved_articles.list.length; j++) {
				var title = saved_articles.list[j].title;
				var reading_time = saved_articles.list[j].reading_time;
				if (reading_time < diff) {
					console.log('article: ' + title);
				} else {
					console.log(reading_time);
				}
			}
		}
		// for (var i=0; i < saved_articles.list.length; i++) {
		// 	var reading_time = saved_articles.list[i].reading_time;
		// 	for (var j=0; j < timeDifferences.length; j++) {
		// 		console.log(timeDifferences[j].timeDifference);
		// 		// if (reading_time < timeDifferences[j].)
		// 	}
		// }
	});
});
