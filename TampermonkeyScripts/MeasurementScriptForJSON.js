// ==UserScript==
// @name         MeasurementScript for JSON
// @namespace    http://tampermonkey.net/
// @version      2024-03-01
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
    function measureJSONParsing() {
        // Measure time taken for JSON parsing
        var startTime = performance.now(); // Record start time
        fetch('https://oscarswebsite.se/Examensarbete/Data/smalldata.json')
            .then(response => response.text()) // Get JSON text
            .then(jsonText => {
                // Now parse the JSON text
                var data = JSON.parse(jsonText);
                var endTime = performance.now(); // Record end time
                var parsingTime = endTime - startTime; // Calculate parsing time
                console.log('Time taken to parse JSON data: ' + parsingTime + ' milliseconds');

                // Use the parsed JSON data here
                displayData(data);

                // Record parsing time
                loadingTimes.push(parsingTime);

                // Increment the counter
                measurementsCompleted++;

                // Check if all measurements are completed
                if (measurementsCompleted === 1000) {
                    saveToJSON();
                }
            })
            .catch(error => {
                console.error('Error fetching or parsing JSON:', error);

                // Increment the counter even if there's an error
                measurementsCompleted++;

                // Check if all measurements are completed
                if (measurementsCompleted === 1000) {
                    saveToJSON();
                }
            });
    }

    // Measure page load time 1000 times
    for (var i = 0; i < 1000; i++) {
        setTimeout(measureJSONParsing(),1000*i);
    }

    // Save loading times to JSON file
    function saveToJSON() {
        var currentDate = new Date();
        var currentTimeString = currentDate.toTimeString().slice(0, 8); // Get current time in HH_MM_SS format
        var fileName = "data_" + currentTimeString + ".json"; // Construct the file name with the date

        var indexedLoadingTimes = {};
        for (var i = 0; i < loadingTimes.length; i++) {
            indexedLoadingTimes[(i + 1).toString()] = loadingTimes[i];
        }

        var data = JSON.stringify(indexedLoadingTimes, null, "\t");
        var blob = new Blob([data], { type: "application/json" });
        saveAs(blob, fileName);
    }
})();