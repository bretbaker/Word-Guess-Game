// -------------------------
// global variables ------------------------------------------------------------------------
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
// global functions --------------------------------------------------------------------------
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

// functions to be called if user wins, changes image source to relevant file
let boardwalkImage = () => {
    document.getElementById("image").src = "assets/images/boardwalk.jpg";
    document.getElementById("winning-word").innerHTML = "Boardwalk!";
}
let beachballImage = () => {
    document.getElementById("image").src = "assets/images/beachball.jpg";
    document.getElementById("winning-word").innerHTML = "Beachball!";
}
let crabImage = () => {
    document.getElementById("image").src = "assets/images/crab.jpg";
    document.getElementById("winning-word").innerHTML = "Crab!";
}
let conchImage = () => {
    document.getElementById("image").src = "assets/images/conch.jpg";
    document.getElementById("winning-word").innerHTML = "Conch!";
}
let lifeguardImage = () => {
    document.getElementById("image").src = "assets/images/lifeguard.jpg";
    document.getElementById("winning-word").innerHTML = "Lifeguard!";
}
let pelicanImage = () => {
    document.getElementById("image").src = "assets/images/pelican.jpg";
    document.getElementById("winning-word").innerHTML = "Pelican!";
}
let seagullImage = () => {
    document.getElementById("image").src = "assets/images/seagull.jpg";
    document.getElementById("winning-word").innerHTML = "Seagull!";
}
let starfishImage = () => {
    document.getElementById("image").src = "assets/images/starfish.jpg";
    document.getElementById("winning-word").innerHTML = "Starfish!";
}
let sandcastleImage = () => {
    document.getElementById("image").src = "assets/images/sandcastle.jpg";
    document.getElementById("winning-word").innerHTML = "Sandcastle!";
}
let surfboardImage = () => {
    document.getElementById("image").src = "assets/images/surfboard.jpg";
    document.getElementById("winning-word").innerHTML = "Surfboard!";
}


// set blank spaces for each letter of chosen word
let blankSpacesArr = () => {
    for (let i = 0; i < chosenWord.length; i++) {
        blankSpaces.push("_") * i;
    }
}

// get user input, compare it against all indices of currentWord and splice the value(s) into blankSpaces at correct index position
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

// win condition function
let winner = () => {
    winCount += 1;
    document.getElementById("wins").innerHTML = winCount;
    chosenWord = randWord();
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

// lose condition function
let loser = () => {
    lossCount += 1;
    document.getElementById("losses").innerHTML = lossCount;
    chosenWord = randWord();
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

// check if input letter has already been guessed
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

// check if input is a special character
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
chosenWord = randWord();
chosenWord = chosenWord.toUpperCase();
// console.log(chosenWord);
currentWordArr();
// console.log(currentWord);
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
    // console.log(letterGuessed);
    lettersGuessed.push(letterGuessed);
    // console.log(lettersGuessed);
    alreadyGuessed = alreadyGuessedCheck();
    specChar = specCharCheck();
    if (alreadyGuessed && specChar === false) {
        document.getElementById("alert").innerHTML = "You already guessed that letter! Guess a different one!";
        lettersGuessed.pop();
    } else if (alreadyGuessed === false && specChar === false) {
        spliceBlankSpaces();
        let winWord = blankSpaces.join("");
        // console.log(winWord);
        // console.log(lettersGuessed);
        // console.log(blankSpaces);
        document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
        document.getElementById("guesses").innerHTML = lettersGuessed.join(", ");
        guessesRemaining -= 1;
        document.getElementById("guessesLeft").innerHTML = guessesRemaining;
        if (winWord === chosenWord && chosenWord === "BOARDWALK") {
            boardwalkImage();
            winner();
        } else if (winWord === chosenWord && chosenWord === "BEACHBALL") {
            beachballImage();
            winner();
        } else if (winWord === chosenWord && chosenWord === "CRAB") {
            crabImage();
            winner();
        } else if (winWord === chosenWord && chosenWord === "CONCH") {
            conchImage();
            winner();
        } else if (winWord === chosenWord && chosenWord === "SEAGULL") {
            seagullImage();
            winner();
        } else if (winWord === chosenWord && chosenWord === "LIFEGUARD") {
            lifeguardImage();
            winner();
        } else if (winWord === chosenWord && chosenWord === "SURFBOARD") {
            surfboardImage();
            winner();
        } else if (winWord === chosenWord && chosenWord === "PELICAN") {
            pelicanImage();
            winner();
        } else if (winWord === chosenWord && chosenWord === "STARFISH") {
            starfishImage();
            winner();
        } else if (winWord === chosenWord && chosenWord === "SANDCASTLE") {
            sandcastleImage();
            winner();
        } else if (winWord != chosenWord && guessesRemaining === 0) {
            loser();
        }
    } else if (specChar === true) {
        document.getElementById("alert").innerHTML = "Error! No special characters!";
        lettersGuessed.pop();
    }
}