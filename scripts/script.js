document.getElementById("play").onclick = function() {

let landing = document.getElementById("landing");
landing.innerHTML = "";

let word = prompt("Player 1, please enter a word for Player 2 to guess.").toUpperCase();

let revealedLetters = new Array(word.length);
revealedLetters.fill(false);

const maxStrikes = 6;
let strikes = 0;

let strikeLetters = new Array(maxStrikes);

let gallowsSection = document.getElementById("gallows");
let img = document.createElement("img");
img.id = "image";
img.src = "images/strike-" + strikes + ".png";
let image = document.getElementById("image");
if(image) gallowsSection.removeChild(image);
gallowsSection.appendChild(img);

drawWordProgress();

// Update incorrect guess letters
function drawStrikeLetters(){
    let strikesSection = document.getElementById("strikes");
    let wrongLetters = document.createElement("span");
    wrongLetters.id = "wrongLetters";
    let wrong = document.getElementById("wrongLetters");

    strikeLettersFilter = strikeLetters.filter(item => item);
    
    if(wrong) strikesSection.removeChild(wrong);

    strikesSection.appendChild(wrongLetters);
    wrongLetters.innerHTML = "Wrong letters: " + strikeLettersFilter;
}

// Update word progress
function drawWordProgress(){
    let progressSection = document.getElementById("answer");
    let progress = document.createElement("span");
    progress.id = "progress";
    let showProgress = document.getElementById("progress");

    for(let j = 0; j < revealedLetters.length; j++){
        if(revealedLetters[j] == false){
            revealedLetters[j] = "-";
        }
    }

    let solution = revealedLetters.join('');

    if(showProgress) progressSection.removeChild(showProgress);

    progressSection.appendChild(progress);
    progress.innerHTML = "Word progress: " + solution;
}

// Update gallows image
function drawGallows(){
    let gallowsSection = document.getElementById("gallows");
    
    let img = document.createElement("img");
    img.id = "image";
    img.src = "images/strike-" + strikes + ".png";
    let image = document.getElementById("image");
    
    if(image) gallowsSection.removeChild(image);

    gallowsSection.appendChild(img);
}

let form = document.createElement("form");
form.setAttribute("method", "post");
form.setAttribute("action", "submit.php");

let instructions = document.createElement("span");
instructions.id = "instructions";
instructions.innerText = "Guess a letter: ";

let input = document.createElement("input");
input.type = "text";
input.name = "guess";
input.id = "input";

let submitBtn = document.createElement("input");
submitBtn.id = "submitBtn";
submitBtn.type = "submit";
submitBtn.value = "Submit";

form.appendChild(instructions);
form.appendChild(input);
form.appendChild(submitBtn);

guessSection.appendChild(form);

form.addEventListener("submit", processGuess);

// Update everything
function processGuess(event){
    event.preventDefault();
    let input = document.getElementById("input");
    let guess = input.value.toUpperCase();
    input.value = "";

    if(strikes < maxStrikes){
        if(revealedLetters.includes(guess)){
            alert(guess + " was already filled in.");
        }if(word.includes(guess) && guess.length == 1){
            for(let i = 0; i < word.length; i++){ 
                if(word[i] == guess) {
                    revealedLetters[i] = guess;                    
                    drawWordProgress();
                }
            }
        }else {
            if(strikeLetters.includes(guess)){
                alert("You already guessed that letter.");
            }else if(guess == parseInt(guess, 10)){
                alert("That is a number. Guess a letter.");
            }else if(guess.length !== 1){
                alert("Enter a single letter.")
            }
                else{
                strikes += 1;
                strikeLetters.push(guess);
                drawGallows();
                drawStrikeLetters();
            }
    }
}
    else {
        alert("Player 1 wins!");
        document.body.innerHTML = "";
        let button = document.createElement("button");
        let msg = document.createElement("p");
        msg.id = "message";
        msg.innerHTML= "The word was: " + word;
        button.id = "button";
        button.type = "submit";
        document.body.appendChild(msg);
        document.body.appendChild(button);
        button.innerHTML = "Play Again";
        button.addEventListener("click", function(){location.reload()});
    }
    let win = revealedLetters.includes("-");
    if(win == false) {
        alert("Player 2 wins!");
        document.body.innerHTML = "";
        let button = document.createElement("button");
        let msg = document.createElement("p");
        msg.id = "message";
        msg.innerHTML = "The word was: " + word;
        button.id = "button";
        button.type = "submit";
        document.body.appendChild(msg);
        document.body.appendChild(button);
        button.innerHTML = "Play Again";
        button.addEventListener("click", function(){location.reload()});
    }
}

}