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


		var clientId = '672637753859-6djrtn7mm822mo305t5pg1qpsg9s2oms.apps.googleusercontent.com';
		var apiKey = 'AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M';
		var scopes = 'https://www.googleapis.com/auth/calendar';


		function handleClientLoad() {
		  gapi.client.setApiKey(apiKey);
		  window.setTimeout(checkAuth,1);
		  checkAuth();
		}

		function checkAuth() {
		  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
		      handleAuthResult);
		}

		function handleAuthResult(authResult) {
		  var authorizeButton = document.getElementById('authorize-button');
		  if (authResult) {
		    authorizeButton.style.visibility = 'hidden';
		    makeApiCall();
		  } else {
		    authorizeButton.style.visibility = '';
		    authorizeButton.onclick = handleAuthClick;
		   }
		}

		function handleAuthClick(event) {
		  gapi.auth.authorize(
		      {client_id: clientId, scope: scopes, immediate: false},
		      handleAuthResult);
		  return false;
		}

		var resource = {
		  "summary": "Appointment",
		  "location": "Somewhere",
		  "start": {
		    "dateTime": "2014-11-23T10:00:00.000-07:00"
		  },
		  "end": {
		    "dateTime": "2014-11-23T10:25:00.000-07:00"
		  }
		};

		function makeApiCall() {
		  gapi.client.load('calendar', 'v3', function() {
		    var request = gapi.client.calendar.events.insert({
		      'calendarId': '4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com',
		      'resource': resource
		    });
		          
			request.execute(function(resp) {
			  console.log(resp);
			});
		  });
		}

		handleAuthClick();

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

		// events is the array of articles to schedule
		var events = {};
		events.list = [];

		for (var i=0; i < timeDifferences.length; i++) {
			var valid_articles = [];

			var diff = timeDifferences[i].timeDifference;
			var start_time = timeDifferences[i].startId;
			var end_time = timeDifferences[i].endId;

			for (var j=0; j < saved_articles.list.length; j++) {
				var title = saved_articles.list[j].title;
				var url = saved_articles.list[j].url;
				var reading_time = saved_articles.list[j].reading_time;

				if (reading_time < diff) {
					// save to valid_articles array
					var valid_article = {
						'title': title,
						'url': url,
						'reading_time': reading_time
					}
					valid_articles.push(valid_article);
				} else {
					// do nothing
				}				
			}
			// take random article from valid_articles array
			var schedule_article = valid_articles[Math.floor(Math.random()*valid_articles.length)];
			var to_schedule  = {
				'time_diff': diff,
				'end_id': end_time,
				'article': schedule_article
			}
			events.list.push(to_schedule);
		}
		// do other things
		console.log(events);
	});
});
