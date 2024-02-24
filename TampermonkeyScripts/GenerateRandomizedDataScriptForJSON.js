// ==UserScript==
// @name         GenerateRandomizedDataScript
// @namespace    http://tampermonkey.net/
// @version      2024-02-24
// @description  Generate Randomized Data in JSON
// @author       You
// @match        https://oscarswebsite.se/Examensarbete/GenerateRandomizedData/
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://raw.githubusercontent.com/LenaSYS/ContextFreeLib/master/js/contextfreegrammar.js
// @require      https://raw.githubusercontent.com/LenaSYS/Random-Number-Generator/master/seededrandom.js
// ==/UserScript==

(function() {
    'use strict';

    /*Global variables*/
    // Get the seed value from storage or initialize to 0 if not set
    var seed = GM_getValue('seed', 0);

    // Store the seed value
    GM_setValue('seed',seed);
    // Use the seed to set randomization
    Math.setSeed(seed);
    //console.log("seed="+ seed);

    // Loop to generate code
    for(let i=0;i<5;i++){
        console.log("Code should be generated here, now.");
        // Reset seed after 5 iterations
        if (i === 4) {
            GM_setValue("seed", 0);
        }
    }
})();