// set initial cases
let guessesRemaining = 12;
let lettersGuessed = [];
let letterGuessed;
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

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
                console.log(blankSpaces);
            })
        }
    })
}

 

// display initial blank spaces and guesses remaining
window.onload = () => {
    document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
    document.getElementById("guessesLeft").innerHTML = "12";
}

// get user input and return appropriate output
document.onkeyup = (event) => {
    letterGuessed = event.key;
    letterGuessed = letterGuessed.toUpperCase();
    lettersGuessed.push(letterGuessed);
    letterMatch();
    document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
    document.getElementById("guesses").innerHTML = lettersGuessed.join(", ");
    guessesRemaining -= 1;
    document.getElementById("guessesLeft").innerHTML = guessesRemaining;
    // for (let i = 0; i < currentWord.length; i++) {
    //     if (letterGuessed === currentWord[i]) {
    //         blankSpaces.splice(i, 1, letterGuessed);
    //         document.getElementById("currentWord").innerHTML = blankSpaces.join(" ");
    //     }
    // }
}