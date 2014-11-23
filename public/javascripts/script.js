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


		// gapi.client.setApiKey("AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M");
		// gapi.auth.authorize({
		// 	scope: "https://www.googleapis.com/auth/calendar"
		// });

		// gapi.client.load("calendar", "v3", function() {

		// 	var resource = {
		// 	  "summary": "Appointment",
		// 	  "location": "Somewhere",
		// 	  "start": {
		// 	    "dateTime": "2014-11-23T10:00:00.000-07:00"
		// 	  },
		// 	  "end": {
		// 	    "dateTime": "2014-11-23T10:25:00.000-07:00"
		// 	  }
		// 	};

		// 	var request = gapi.client.calendar.events.insert({
		// 	  'calendarId': '4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com',
		// 	  'resource': resource
		// 	});

		// 	request.execute(function(resp) {
		// 	  console.log(resp);
		// 	});



		})



		// var saved_articles = {};
		// saved_articles.list = [];
		// $('.item').each(function(i) {
		// 	var reading_time = $(this).find('#reading-time').text();
		// 	var url = $(this).find('a').attr('href');
		// 	var title = $(this).find('a').text();
		// 	var new_article = {
		// 		'title': title,
		// 		'url': url,
		// 		'reading_time': reading_time
		// 	};
		// 	saved_articles.list.push(new_article);
		// });

		// var valid_articles = {};
		// valid_articles.list = [];
		// for (var i=0; i < saved_articles.list.length; i++) {
		// 	var reading_time = saved_articles.list[i].reading_time;
		// 	for (var j=0; j < timeDifferences.length; j++) {
		// 		console.log(timeDifferences[j].timeDifference);
		// 		// if (reading_time < timeDifferences[j].)
		// 	}
		// }
	});
});
