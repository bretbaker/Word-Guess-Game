// set initial cases
let guessesRemaining = 12;
let lettersGuessed = [];
let letterGuessed;
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let charMatch = alphabet.match
let winCount = 0;
let lossCount = 0;
let charTypeCheck;
let alreadyGuessedCheck;


// get random word
let beachWords = ["boardwalk", "beachball", "crab", "conch", "seagull", "lifeguard", "surfboard", "pelican", "starfish", "sandcastle"];
let randNum = () => {
    return Math.floor(Math.random() * beachWords.length);
}
let randWord = () => {
    return beachWords[randNum()];
}
let chosenWord = randWord();
randWord();
chosenWord = chosenWord.toUpperCase();
console.log(chosenWord);

// set current word
let currentWord = [];
let currentWordArr = () => {
    for (let i = 0; i < chosenWord.length; i++) {
        currentWord.push(chosenWord[i]);
    }
}
currentWordArr();
console.log(currentWord);

// set blank spaces for each letter of current word
let blankSpaces = [];
let blankSpacesArr = () => {
    for (let i = 0; i < chosenWord.length; i++) {
        blankSpaces.push("_") * i;
    }
}
blankSpacesArr();

// create function that takes user input, compares it against all indices of currentWord and splices the value(s) into blankSpaces if match occurs
let letterMatch = () => {
    currentWord.forEach((element) => {
        console.log(element);
        let indices = [];
        let idx = currentWord.indexOf(element);
        while (idx != -1) {
            indices.push(idx);
            idx = currentWord.indexOf(element, idx + 1);
          }
            console.log(indices);
        if (element === letterGuessed) {
            indices.forEach((i) => {
                blankSpaces.splice(i, 1, element);
            })
        }
    })
}

// display initial blank spaces and guesses remaining
window.onload = () => {
    document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
    document.getElementById("guessesLeft").innerHTML = "12";
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
    document.getElementById("alert").innerHTML = "";
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
    document.getElementById("alert").innerHTML = "";
}
// create function that checks condition of whether the key pressed is a letter or special character
let charType = () => {
    for (let i = 0; i < alphabet[i].length; i++) {
        console.log(alphabet[i]);
        if (letterGuessed === alphabet[i]) {
            return true;
        } else if (letterGuessed != alphabet[i]) {
            return false;
        }
    }
}

// create function that checks condition of whether the letter guessed has already been guessed or not
let alreadyGuessed = () => {
    for (let i = 0; i < blankSpaces[i].length; i++) {
        if (letterGuessed === blankSpaces[i]) {
            return true;
        } else if (letterGuessed != blankSpaces[i]) {
            return false;
        }
    }
}

// get user input and return appropriate output
document.onkeyup = (event) => {
    letterGuessed = event.key;
    letterGuessed = letterGuessed.toUpperCase();
    console.log(letterGuessed);
    charType();
    charTypeCheck = charType();
    console.log(charTypeCheck);
    alreadyGuessed();
    alreadyGuessedCheck = alreadyGuessed();
    console.log(alreadyGuessedCheck);
    if (charTypeCheck === false) {
        document.getElementById("alert").innerHTML = "Error! No special characters!";
    } else if (charTypeCheck === true && alreadyGuessedCheck === false) {
        lettersGuessed.push(letterGuessed);
        letterMatch();
        let winWord = blankSpaces.join("");
        console.log(chosenWord);
        console.log(winWord);
        console.log(currentWord);
        console.log(blankSpaces);
        document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
        document.getElementById("guesses").innerHTML = lettersGuessed.join(", ");
        guessesRemaining -= 1;
        document.getElementById("guessesLeft").innerHTML = guessesRemaining;
        if (winWord === chosenWord && guessesRemaining > 0) {
            winner();
        } else if (winWord != chosenWord && guessesRemaining === 0) {
            loser();
        } 
    } else if (charTypeCheck === true && alreadyGuessedCheck === true) {
        document.getElementById("alert").innerHTML = "Error! Already guessed that letter!";
    }   
}