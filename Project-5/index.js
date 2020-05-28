// added an event listener -- very important;
window.addEventListener('load', init);

//Global variables
let time = 5;
let score = 0;
let isplaying;
// let selected;

// selected all the difficulty level ids in the DOM
// let easy = document.querySelector('#easy')
// let medium = document.querySelector('#medium')
// let hard = document.querySelector('#hard')

// set the time according to the difficulty level
// if(easy.checked){
// time = 5;
// globaltime = time;
// selected = true;
// }
// else if(medium.checked){
// time = 3;
// globaltime = time;
// selected = true;
// }
// else if(hard.checked){
// time = 2;
// globaltime = time;
// selected = true;
// }

// selected all the ids in the DOM
const wordinput = document.querySelector('#word-input');
const currentword = document.querySelector('#current-word');
const seconds = document.querySelector('#seconds');
const timedisplay = document.querySelector('#time');
const scoredisplay = document.querySelector('#score');
const message = document.querySelector('#message');
let highscore = document.querySelector('#highscore')

//Array of hard coded words as there was no random word api :(
let words = ["thirteen", "Thursday", "princess", "assonant", "thousand", "fourteen", "language", "chipotle", "American", "business", "favorite", "elephant", "children", "birthday", "mountain", "feminine", "football", "kindness", "syllable", "abdicate", "treasure", "Virginia", "envelope", "strength", "together", "memories", "darkness", "February", "sandwich", "calendar", "bullying", "equation", "violence", "marriage", "building", "internal", "November", "drooping", "abortion", "Victoria", "squirrel", "tomorrow", "champion", "sentence", "personal", "remember", "daughter", "hospital", "ordinary", "medicine", "flawless", "umbrella", "Carolina", "computer", "distance", "allusion", "solution", "presence", "dopamine", "homework", "Jonathan", "physical", "innocent", "worrying", "anteater", "yourself", "eternity", "anything", "angelica", "electric", "baseball", "tropical", "goodness", "Paradise", "doughnut", "insomnia", "possible", "kindling", "Scotland", "keyboard", "gangster", "positive", "everyday", "pregnant", "fountain", "sporadic", "politics", "accident", "opposite", "aquarium", "dinosaur", "chemical", "Brittany", "accurate", "infinity", "jennifer", "swimming", "serenity", "republic", "fairness", "thinking", "pressure", "hydrogen", "alphabet", "Aberdeen", "pleasure", "Internet", "December", "learning", "wrenched", "distress", "patience", "Creation", "maneuver", "equality", "advocate", "Harrison", "hopeless", "exchange", "illusion", "thoughts", "flamingo", "sapphire", "Canadian", "savannah", "watching", "Caroline", "struggle", "coughing", "graduate", "diamonds", "congress", "skeleton", "meanness", "katakana", "stranger", "carnival", "clothing", "straight", "everyone", "progress", "brothers", "interest", "surprise", "midnight", "separate", "reindeer", "standard", "nineteen"];

// init function is called when the window loads;
function init() {
    seconds.innerHTML = time;
    //show the high score as soon nas it loads
    showhighscore();
    // call showword function
    showword(words);
    //call startmatch function when then user start typing
    wordinput.addEventListener('input', startmatch);
    //call countdown method after each 1 second
    setInterval(countdown, 1000);
    //call checkstatus method very often
    setInterval(checkstatus, 50);
}

function startmatch() {
    if (matchword()) {
        isplaying = true;
        time = 6;
        showword(words);
        wordinput.value = '';
        score++;
    }
    // display the score
    if (score < 0) {
        scoredisplay.innerHTML = 0;
    }
    else {
        scoredisplay.innerHTML = score;
    }
}

// check whether the word entered matchs the current word 
function matchword() {
    if (currentword.innerHTML === wordinput.value) {
        message.innerHTML = "Correct!!";
        return true;
    }
    else {
        message.innerHTML = '';
        return false;
    }
}

function showword(words) {
    // get a random index from thwe words array;   
    const randomindex = Math.floor(Math.random() * words.length);
    //display the random word 
    currentword.innerHTML = words[randomindex]
}

// function that displays the time on the screen
function countdown() {
    if (time > 0) {
        time--;
    }
    else if (time <= 0) {
        isplaying = false;
        if (score > localStorage.getItem('hscore')) {
            localStorage.setItem('hscore', score);
            highscore.innerHTML = localStorage.getItem('hscore');
        }
        score = -1;
    }
    timedisplay.innerHTML = time;
}

// checks whether the game is being played or not
function checkstatus() {
    if (!isplaying && time === 0) {
        message.innerHTML = "Game Over!!"
    }
}

//function to load the highscore
function showhighscore(){
    if (localStorage.getItem('hscore') != null) {
        highscore.innerHTML = localStorage.getItem('hscore');
    } 
}
