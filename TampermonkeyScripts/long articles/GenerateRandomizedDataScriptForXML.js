// ==UserScript==
// @name         GenerateRandomizedDataScriptForXML (long)
// @namespace    http://tampermonkey.net/
// @version      2024-05-06
// @description  Generate Randomized Data in XML
// @author       You
// @match        http://127.0.0.1/Examensarbete/GenerateRandomizedData/
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

    let allText = '';

    // Loop to generate article(s)
    let amountOfArticles = 100;
    for(let i=0;i<amountOfArticles;i++){
        console.log("Iteration: " + (i + 1));

        /*Set seed*/
        seed++;
        // Store the seed value
        GM_setValue('seed',seed);
        // Use the seed to set randomization
        Math.setSeed(seed);
        console.log("seed="+ seed);

        /*Code to generate data in form of XML*/
        var textArea = document.getElementById("output");

        //Generate headline
        var headline = generate_sentence();

        //Generate author
        let firstNames = ["John", "Emma", "Michael", "Sophia", "James", "Olivia", "William", "Ava", "Alexander", "Isabella", "Ethan", "Mia", "Benjamin", "Charlotte", "Daniel", "Amelia", "Jacob", "Harper", "Matthew", "Evelyn", "Lucas", "Abigail", "Jackson", "Emily", "David", "Madison", "Joseph", "Lily", "Logan", "Grace", "Samuel", "Chloe", "Henry", "Avery", "Owen", "Ella", "Sebastian", "Sofia", "Gabriel", "Scarlett", "Carter", "Victoria", "Jayden", "Riley", "Dylan", "Claire", "Luke", "Nora"];
        let lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King", "Wright", "Scott", "Adams", "Green", "Evans", "Baker", "Hill", "Morris", "Ward", "Cox", "Rivera", "Cook", "Bailey", "Bell", "Murphy"];
        let randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
        let randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
        let randomFirstName = firstNames[randomFirstNameIndex];
        let randomLastName = lastNames[randomLastNameIndex];
        let author = randomFirstName + " " + randomLastName;

        //Generate date
        let day = Math.floor(Math.random()*31) + 1;
        let month = Math.floor(Math.random() * 12) + 1;
        let year = Math.floor(Math.random() * (2025 - 2000)) + 2000;
        var date = day + "-" + month + "-" + year;

        //Generate content
        var wordCount = 0;
        // Set a fixed number of words for each article
        var fixedWordCount = 500;
        var minWordCount = fixedWordCount;
        var maxWordCount = fixedWordCount;
        var generatedSentences = [];

        while (wordCount < minWordCount) {
            var content = generate_sentence();
            var words = content.split(' ');
            if (wordCount + words.length <= maxWordCount) {
                generatedSentences.push(content);
                wordCount += words.length;
            } else {
                break;
            }
        }

        // Join the generated sentences into a single string
        var allContent = generatedSentences.join("");

        // Append the content to the existing content in the textarea
        allText += '<article><headline>' + headline + '</headline><author>' + author + '</author><publication_date>' + date + '</publication_date><content>' + allContent + '</content></article>';
    }
    GM_setValue("seed", 0);
    // Place accumulated data inside the textarea
    textArea.value += '<articles>' + allText + '</articles>';
})();