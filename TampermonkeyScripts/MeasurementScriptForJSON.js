// ==UserScript==
// @name         MeasurementScript for JSON
// @namespace    http://tampermonkey.net/
// @version      2024-02-24
// @description  Page Loading Speed Measurement Script with JSON Logging
// @author       You
// @match        https://oscarswebsite.se/Examensarbete/JSONApplication/
// @grant        GM_download
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js
// ==/UserScript==

(function() {
    'use strict';

    // Array to store loading times
    var loadingTimes = [];

    // Counter to keep track of completed measurements
    var measurementsCompleted = 0;

    // Function to measure page loading time and log to console
    function measurePageLoad() {
        var startTime = performance.now(); // Record start time
        fetch('https://oscarswebsite.se/Examensarbete/Data/smalldata.json')
            .then(response => response.json())
            .then(data => {
                var endTime = performance.now(); // Record end time
                var loadingTime = endTime - startTime; // Calculate loading time
                loadingTimes.push(loadingTime); // Store loading time
                console.log('Page loaded in ' + loadingTime + ' milliseconds');

                // Use the loaded JSON data here
                displayData(data);

                // Increment the counter
                measurementsCompleted++;

                // Check if all measurements are completed
                if (measurementsCompleted === 1000) {
                    saveToJSON(); // Call saveToJSON function
                }
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);

                // Increment the counter even if there's an error
                measurementsCompleted++;

                // Check if all measurements are completed
                if (measurementsCompleted === 1000) {
                    saveToJSON(); // Call saveToJSON function
                }
            });
    }

    // Measure page load time 1000 times
    for (var i = 0; i < 1000; i++) {
        measurePageLoad();
    }

    // Save loading times to JSON file
    function saveToJSON() {
        var currentDate = new Date();
        var currentTimeString = currentDate.toTimeString().slice(0,8); // Get current time in HH_MM_SS format
        var fileName = "data_" + currentTimeString + ".json"; // Construct the file name with the date
        var data = JSON.stringify(loadingTimes, null, "\t");
        var blob = new Blob([data], { type: "application/json" });
        saveAs(blob, fileName);
    }
})();