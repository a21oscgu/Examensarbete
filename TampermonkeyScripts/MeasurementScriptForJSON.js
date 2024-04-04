// ==UserScript==
// @name         MeasurementScript for JSON
// @namespace    http://tampermonkey.net/
// @version      2024-04-04
// @description  Page Loading Speed Measurement Script with JSON Logging
// @author       You
// @match        http://127.0.0.1/Examensarbete/JSONApplication/
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
        var customTime = new Date().toISOString(); // Get current time in ISO format
        fetch(`http://127.0.0.1/Examensarbete/ArticleData/1000data.json?time=${encodeURIComponent(customTime)}`)
            .then(response => response.text()) // Get JSON text
            .then(jsonText => {
                // Now parse the JSON text
                var data = JSON.parse(jsonText);

                // Use the parsed JSON data here
                displayData(data);

                var endTime = performance.now(); // Record end time
                var parsingTime = endTime - startTime; // Calculate parsing time
                console.log('Time taken to parse JSON data: ' + parsingTime + ' milliseconds');

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
        setTimeout(measureJSONParsing, 1000 * i); // setTimeout expects a function reference
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