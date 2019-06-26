// -------------------------
// declare global variables ------------------------------------------------------------------------
// -------------------------

let guessesRemaining = 12;
let lettersGuessed = [];
let letterGuessed;
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let winCount = 0;
let lossCount = 0;
let alreadyGuessed;
let indices;
let chosenWord;
let beachWords = ["boardwalk", "beachball", "crab", "conch", "seagull", "lifeguard", "surfboard", "pelican", "starfish", "sandcastle"];
let currentWord = [];
let blankSpaces = [];
let specChar;

// ---------------------------
// declare global functions --------------------------------------------------------------------------
// ----------------------------

// get random word
let randNum = () => {
    return Math.floor(Math.random() * beachWords.length);
}
let randWord = () => {
    return beachWords[randNum()];
}

// generate array for chosen word
let currentWordArr = () => {
    for (let i = 0; i < chosenWord.length; i++) {
        currentWord.push(chosenWord[i]);
    }
}

// set blank spaces for each letter of random word
let blankSpacesArr = () => {
    for (let i = 0; i < chosenWord.length; i++) {
        blankSpaces.push("_") * i;
    }
}

// create function that takes user input, compares it against all indices of currentWord and splices the value(s) into blankSpaces at correct index position
let spliceBlankSpaces = () => {
    currentWord.forEach((element) => {
        // console.log(element);
        indices = [];
        let idx = currentWord.indexOf(element);
        while (idx != -1) {
            indices.push(idx);
            idx = currentWord.indexOf(element, idx + 1);
          }
            // console.log(indices);
        if (element === letterGuessed) {
            indices.forEach((i) => {
                blankSpaces.splice(i, 1, element);
            })
        }
    })
}

// create win condition function
let winner = () => {
    winCount += 1;
    document.getElementById("wins").innerHTML = winCount;
    chosenWord = randWord();
    randWord();
    chosenWord = chosenWord.toUpperCase();
    console.log(chosenWord);
    currentWord = [];
    currentWordArr();
    console.log(currentWord);
    blankSpaces = [];
    blankSpacesArr();
    document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
    guessesRemaining = 12;
    document.getElementById("guessesLeft").innerHTML = "12";
    lettersGuessed = [];
    document.getElementById("guesses").innerHTML = "";
    document.getElementById("alert").innerHTML = "You win! Play again!";
}

// create lose condition funcion
let loser = () => {
    lossCount += 1;
    document.getElementById("losses").innerHTML = lossCount;
    chosenWord = randWord();
    randWord();
    chosenWord = chosenWord.toUpperCase();
    console.log(chosenWord);
    currentWord = [];
    currentWordArr();
    console.log(currentWord);
    blankSpaces = [];
    blankSpacesArr();
    document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
    guessesRemaining = 12;
    document.getElementById("guessesLeft").innerHTML = "12";
    lettersGuessed = [];
    document.getElementById("guesses").innerHTML = "";
    document.getElementById("alert").innerHTML = "You lose! Try again!";
}

// create function that checks to see if letter has already been guessed, alerts the user so, and prevents them from wasting a guess
let alreadyGuessedCheck = () => {
    lettersGuessed.pop();
    if (lettersGuessed.includes(letterGuessed)) {
        lettersGuessed.push(letterGuessed);
        return true;
    } else {
        lettersGuessed.push(letterGuessed);
        return false;
    }
}

// create function that checks for special characters and returns error if true
let specCharCheck = () => {
    if (alphabet.includes(letterGuessed)) {
        return false;
    } else {
        return true;
    }
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------- M A I N - B O D Y -------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

// call initial functions
randWord();
chosenWord = randWord();
chosenWord = chosenWord.toUpperCase();
console.log(chosenWord);
currentWordArr();
console.log(currentWord);
blankSpacesArr();
window.onload = () => {
    document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
    document.getElementById("guessesLeft").innerHTML = "12";
}

// get user input and return appropriate output
document.onkeyup = (event) => {
    document.getElementById("alert").innerHTML = "";
    letterGuessed = event.key;
    letterGuessed = letterGuessed.toUpperCase();
    console.log(letterGuessed);
    lettersGuessed.push(letterGuessed);
    console.log(lettersGuessed);
    alreadyGuessedCheck();
    alreadyGuessed = alreadyGuessedCheck();
    specCharCheck();
    specChar = specCharCheck();
    if (alreadyGuessed && specChar === false) {
        document.getElementById("alert").innerHTML = "You already guessed that! Guess a different letter!";
        lettersGuessed.pop();
    } else if (alreadyGuessed === false && specChar === false) {
        spliceBlankSpaces();
        let winWord = blankSpaces.join("");
        console.log(winWord);
        console.log(lettersGuessed);
        console.log(blankSpaces);
        document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
        document.getElementById("guesses").innerHTML = lettersGuessed.join(", ");
        guessesRemaining -= 1;
        document.getElementById("guessesLeft").innerHTML = guessesRemaining;
        if (winWord === chosenWord) {
            winner();
        } else if (winWord != chosenWord && guessesRemaining === 0) {
            loser();
        }
    } else if (specChar === true) {
        document.getElementById("alert").innerHTML = "Error! No special characters!";
        lettersGuessed.pop();
    }
}