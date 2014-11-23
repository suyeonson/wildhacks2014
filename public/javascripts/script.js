var getCalendar = "https://www.googleapis.com/calendar/v3/calendars/4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com/events?key=AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M";

$(document).ready(function() {

	$.getJSON(getCalendar, function(data) {
		
		var response = data["items"]

		// console.log(response)

		var timeDifferences = [];

		for (var i=0; i < response.length-1; i++) {

			if (response[i+1]["end"]["dateTime"].split("T")[0] == response[i]["start"]["dateTime"].split("T")[0]) {


				var startTime = moment(response[i+1]["start"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss")

				var endTime = moment(response[i]["end"]["dateTime"],"YYYY/MM/DD[T]HH:mm:ss")

				timeDifferences.push({
					"startId": response[i+1]["id"],
					"endId": response[i]["id"],
					"timeDifference": moment.duration(startTime.diff(endTime)).asMinutes()
				});
			}; 
		};

		var clientId = '672637753859-6djrtn7mm822mo305t5pg1qpsg9s2oms.apps.googleusercontent.com';
		var apiKey = 'AIzaSyDFIPR7NpYdr5-2ykZqjoMsuT9EYW_zt_M';
		var scopes = 'https://www.googleapis.com/auth/calendar';

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

				if (reading_time < diff && reading_time > 1) {
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

		var allResources = [];

		for (var k = 0; k < events.list.length; k++) {
			for (var j = 0; j < response.length; j++) {
				if (response[j]["id"] == events.list[k]["end_id"]) {

					var summary = events.list[k]["article"]["title"];
					var description = events.list[k]["article"]["url"];
					var start = response[j]["end"]["dateTime"];

					var addMinutes = events.list[k]["article"]["reading_time"];

					var endTime = moment(response[j]["end"]["dateTime"]).clone();

					var finalEndTime = endTime.add(addMinutes, "minutes").format("YYYY-MM-DDTHH:mm:ssZ")
					var resource = {};

					resource["summary"] = summary;
					resource["description"] = description;
					resource["start"] = {"dateTime":start};
					resource["end"] = {"dateTime":finalEndTime};

					allResources.push(resource);
					$('.results').hide();
					$('.schedule').append("<div class='article'><p><a href='" + description + "'>" + summary + "</a></p></div>");

				};
			};

		};


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
		    makeApiCall();
		  } 
		}

		function handleAuthClick(event) {
		  gapi.auth.authorize(
		      {client_id: clientId, scope: scopes, immediate: false},
		      handleAuthResult);
		  return false;
		}

		function makeApiCall() {
		  gapi.client.load('calendar', 'v3', function() {

		  	for (var x = 0; x < allResources.length; x++) {

			    var request = gapi.client.calendar.events.insert({
			      'calendarId': '4cpkvhth0nvtedeo8t7tlfbupk@group.calendar.google.com',
			      'resource': allResources[x]
	
			    });

			    request.execute();

		  	};
		  	  

		  });
		}

		handleAuthClick();

	});
});