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

        /*Code to generate data in form of JSON*/
        var textArea = document.getElementById("output");
        var headline = generate_sentence();

        let firstNames = ["John", "Emma", "Michael", "Sophia", "James", "Olivia", "William", "Ava", "Alexander", "Isabella", "Ethan", "Mia", "Benjamin", "Charlotte", "Daniel", "Amelia", "Jacob", "Harper", "Matthew", "Evelyn", "Lucas", "Abigail", "Jackson", "Emily", "David", "Madison", "Joseph", "Lily", "Logan", "Grace", "Samuel", "Chloe", "Henry", "Avery", "Owen", "Ella", "Sebastian", "Sofia", "Gabriel", "Scarlett", "Carter", "Victoria", "Jayden", "Riley", "Dylan", "Claire", "Luke", "Nora"];
        let lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King", "Wright", "Scott", "Adams", "Green", "Evans", "Baker", "Hill", "Morris", "Ward", "Cox", "Rivera", "Cook", "Bailey", "Bell", "Murphy"];
        let randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
        let randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
        let randomFirstName = firstNames[randomFirstNameIndex];
        let randomLastName = lastNames[randomLastNameIndex];
        let author = randomFirstName + " " + randomLastName;

        let day = Math.floor(Math.random()*31) + 1;
        let month = Math.floor(Math.random() * 12) + 1;
        let year = Math.floor(Math.random() * (2025 - 2000)) + 2000;
        var date = day + "-" + month + "-" + year;

        var content = generate_sentence();
        textArea.value = '{"articles": {"article": [{"headline":"' + headline + '","author": "' + author + '","publication_date": "' + date + '","content": "' + content + '"},]}}';

        // Reset seed after 5 iterations
        if (i === 4) {
            GM_setValue("seed", 0);
        }
    }
})();