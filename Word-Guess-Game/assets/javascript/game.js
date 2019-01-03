
//VARIABLES
var words = ["aman", "rahul", "saurabh", "priyanka", "kalpesh", "dannyphantom", "vikas"]

//Empty variables to store values later
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;



// ALL FUNCTIONS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//__________________________________________________________
//GAME START FUNCTION
//__________________________________________________________
function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}


//__________________________________________________________
//AUDIO FUNCTION
//__________________________________________________________

//variables for audio function
var a = document.getElementById("aman");
var r = document.getElementById("rahul");
var saurabh = document.getElementById("saurabh");
var priyanka = document.getElementById("priyanka");
var kalpesh = document.getElementById("kalpesh");
var danny = document.getElementById("danny");
var vikas = document.getElementById("vikas");


function aud() {
    //Arthur Audio & Image
    //---------------------------
    if (randomWord === words[0]) {
        priyanka.pause();
        kalpesh.pause();
        danny.pause();
        vikas.pause();
        saurabh.pause();
        r.pause();
        a.play();
        document.getElementById("image").src = "./assets/images/arther.gif";
    }
    //Rugrats Audio & Image
    //---------------------------
    else if (randomWord === words[1]) {
        priyanka.pause();
        kalpesh.pause();
        danny.pause();
        vikas.pause();
        saurabh.pause();
        a.pause();
        r.play();
        document.getElementById("image").src = "./assets/images/rugrats.gif";
    }
    //Simpsons Audio & Image
    //---------------------------
    else if (randomWord === words[2]) {
        priyanka.pause();
        kalpesh.pause();
        danny.pause();
        vikas.pause();
        r.pause();
        a.pause();
        saurabh.play();
        document.getElementById("image").src = "./assets/images/simpsons.gif";
    }
    //Scooby-doo Audio & Image
    //---------------------------
    else if (randomWord === words[3]) {
        kalpesh.pause();
        danny.pause();
        vikas.pause();
        saurabh.pause();
        r.pause();
        a.pause();
        priyanka.play();
        document.getElementById("image").src = "./assets/images/scooby.gif";
    }
    //Spongebob Audio & Image
    //---------------------------
    else if (randomWord === words[4]) {
        danny.pause();
        vikas.pause();
        saurabh.pause();
        r.pause();
        a.pause();
        priyanka.pause();
        kalpesh.play();
        document.getElementById("image").src = "./assets/images/spongebob.gif";
    }
    //Danny Audio & Image
    //---------------------------
    else if (randomWord === words[5]) {
        kalpesh.pause();
        vikas.pause();
        saurabh.pause();
        r.pause();
        a.pause();
        priyanka.pause();
        danny.play();
        document.getElementById("image").src = "./assets/images/danny.gif";
    }
    //Teen Titans Audio & Image
    //---------------------------
    else if (randomWord === words[6]) {
        kalpesh.pause();
        danny.pause();
        saurabh.pause();
        r.pause();
        a.pause();
        priyanka.pause();
        vikas.play();
        document.getElementById("image").src = "./assets/images/teen.gif";
    }
};

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//__________________________________________________________
//FINAL COMPLETE FUNCTION
//__________________________________________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        aud()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/try-again.png"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//_____________________________________________________
// EXECUTE CODE 
//_____________________________________________________

//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}

