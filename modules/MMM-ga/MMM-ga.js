/* global Module */

/* Magic Mirror
 * Module: MMM-ga GoogleAnalytics module
 *
 * By Skippy Skefnietof http://www.skippyweb.nl
 * MIT Licensed.
 */

Module.register("MMM-ga",{
		// Default module config.
		defaults: {
			text: 'test text',
			startDate: '2017-02-12',
			endDate: 'today',
			viewID: 'ga:37419435'
		},
   getScripts: function() {
      return ['https://apis.google.com/js/client:platform.js'];
   },
 	getStyles: function() {
		return ["MMM-ga.css"];
	},
	// Override dom generator.
	getDom: function() {
		//var queryReports = this.queryReports();
		var MMMga = document.createElement("div");
                MMMga.className = "MMM-ga" + this.config.text;
		
                var ga = document.createElement("p");
                ga.setAttribute('data-onsuccess','queryReports');
                ga.className = "g-signin2";
                MMMga.appendChild(ga);

                //var gascript = document.createElement("script");
		//gascript.src = "https://apis.google.com/js/client:platform.js";
                //MMMga.appendChild(gascript);

                var debugtxt = document.createElement("textarea");
                debugtxt.id = "query-output";
                MMMga.appendChild(debugtxt);
                return MMMga;
	},
	start: function() {
console.log(this.config.viewID);

		gapi.client.request({
		      path: '/v4/reports:batchGet',
		      root: 'https://analyticsreporting.googleapis.com/',
		      method: 'POST',
		      body: {
		        reportRequests: [
		          {
		            viewId: VIEW_ID,
		            dateRanges: [
		              {
		                startDate: '7daysAgo',
		                endDate: 'today'
		              }
		            ],
		            metrics: [
		              {
		                expression: 'ga:sessions'
		              }
		            ]
		          }
		        ]
		      }
   		 }).then(displayResults, console.error.bind(console));
	},
	displayResults: function(response) {
		var formattedJson = JSON.stringify(response.result, null, 2);
    		document.getElementById('query-output').value = formattedJson;

	}
});
//907595300534-9b0ovfi5g4rro3or8pj690vok7du0ocs.apps.googleusercontent.com
// Replace with your view ID.


// Replace with your view ID.
  var VIEW_ID = 'ga:37419435';

  // Query the API and print the results to the page.
  function queryReports() {
    gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: VIEW_ID,
            dateRanges: [
              {
                startDate: '7daysAgo',
                endDate: 'today'
              }
            ],
            metrics: [
              {
                expression: 'ga:sessions'
              }
            ]
          }
        ]
      }
    }).then(displayResults, console.error.bind(console));
  }

  function displayResults(response) {
    var formattedJson = JSON.stringify(response.result, null, 2);
    document.getElementById('query-output').value = formattedJson;
  }













