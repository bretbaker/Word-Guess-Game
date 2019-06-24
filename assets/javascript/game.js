// get random word
let beachWords = ["boardwalk", "beachball", "crab", "conch", "seagull", "lifeguard", "surfboard", "pelican", "starfish", "sandcastle"];
let randNum = () => {
    return Math.floor(Math.random() * beachWords.length);
}
let randWord = beachWords[randNum()];
console.log(randWord);

// get current word
let currentWord = [];
let currentWordArr = () => {
    for (let i = 0; i < randWord.length; i++) {
        currentWord.push(randWord[i]);
    }
}
currentWordArr();
console.log(currentWord);

// get blank spaces for each letter of current word
let blankSpaces = [];
let blankSpacesArr = () => {
    for (let i = 0; i < randWord.length; i++) {
        blankSpaces.push("_") * i;
    }
}
blankSpacesArr();
console.log(blankSpaces);

// set initial cases
let guessesRemaining = 13;
let lettersGuessed = [];
let letterGuessed;

// get user input
document.onkeyup = (event) => {
    letterGuessed = event.key;
    lettersGuessed.push(letterGuessed);
    console.log(lettersGuessed);
}