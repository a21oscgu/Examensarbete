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

    // Function to measure page loading time and log to console
    function measurePageLoad() {
        //DOES NOT WORK AT THE MOMENT
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
    // Call saveToJSON function after all measurements are done
    setTimeout(saveToJSON, 10000); // Assuming all measurements are done within 10 seconds
})();
