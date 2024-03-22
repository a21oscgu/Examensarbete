// ==UserScript==
// @name         MeasurementScript for XML
// @namespace    http://tampermonkey.net/
// @version      2024-03-22
// @description  Page Loading Speed Measurement Script with JSON Logging
// @author       You
// @match        https://oscarswebsite.se/Examensarbete/XMLApplication/
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
        // Measure time taken for XML parsing
        var startTime = performance.now();
        var customTime = new Date().toISOString(); // Get current time in ISO format
        var url = `https://oscarswebsite.se/Examensarbete/Data/smalldata.xml?time=${encodeURIComponent(customTime)}`;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var endTime = performance.now();
                var parsingTime = endTime - startTime;
                console.log("Time taken to parse XML data: " + parsingTime + " milliseconds");
                loadingTimes.push(parsingTime);

                // Increment the counter
                measurementsCompleted++;

                // Check if all measurements are completed
                if (measurementsCompleted === 1000) {
                    saveToJSON();
                }
            }
        };
        xhr.send();
    }

    // Measure page load time 1000 times
    for (var i = 0; i < 1000; i++) {
        setTimeout(measurePageLoad, 1000 * i);
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