// ==UserScript==
// @name         MeasurementScript for XML
// @namespace    http://tampermonkey.net/
// @version      2024-05-06
// @description  Page Loading Speed Measurement Script with JSON Logging
// @author       You
// @match        http://127.0.0.1/Examensarbete/XMLApplication/
// @grant        GM_download
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js
// ==/UserScript==

(function() {
    'use strict';

    // Array to store loading times
    var loadingTimes = [];

    // Counter to keep track of completed measurements
    var measurementsCompleted = 0;

    var amountOfMeasurements = 1000;

    // Function to measure page loading time and log to console
    function measureXMLParsing() {
        // Measure time taken for XML parsing
        var startTime = performance.now();
        var customTime = new Date().toISOString(); // Get current time in ISO format
        var xmlUrl = `http://127.0.0.1/Examensarbete/ArticleData/mixed%20articles/1000data.xml?time=${encodeURIComponent(customTime)}`;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", xmlUrl, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Fetch the XML data
                fetch(xmlUrl)
                    .then(response => response.text())
                    .then(xmlText => {
                        // Parse the XML data
                        const parser = new DOMParser();
                        const data = parser.parseFromString(xmlText, 'text/xml');
                        // Use the parsed XML data here
                        displayData(data);
                    });

                var endTime = performance.now();
                var parsingTime = endTime - startTime;
                console.log("Time taken to parse XML data: " + parsingTime + " milliseconds");
                loadingTimes.push(parsingTime);

                // Increment the counter
                measurementsCompleted++;

                // Check if all measurements are completed
                if (measurementsCompleted === amountOfMeasurements) {
                    saveToJSON();
                }
            }
        };
        xhr.send();
    }

    // Measure page load time 1000 times
    for (var i = 0; i < amountOfMeasurements; i++) {
        setTimeout(measureXMLParsing, 1000 * i);
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