let timeLeft = 60;
let timer;
let started = false;
let fetchedQuote = "";  // Store the fetched quote
let correctWords = 0;
let totalWords = 1;
 let mistakes=0;
const inputField = document.getElementById("typingInput");
const progressBar = document.getElementById("progressBar");
const scoreCircle = document.getElementById("scoreCircle");
const scoreText = document.getElementById("score");


async function fetchQuote() {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        if (response.ok) {  
            const data = await response.json();
            fetchedQuote = data.quote;

            displayQuote(fetchedQuote);
            totalWords = fetchedQuote.split(" ").length;
        } else {
            console.error('Error: Failed to fetch data');
            document.getElementById("paragraph").innerHTML = "Error fetching quote.";
        }
    } catch (error) {
        document.getElementById("paragraph").innerHTML = "Error loading data.";
        console.error(error);
    }
}

function displayQuote(text) {
    const words = text.split(" ");
    const formattedWords = words.map(word => `<span class="word">${word}</span>`).join(" ");
    document.getElementById("paragraph").innerHTML = formattedWords;
}


fetchQuote();

inputField.addEventListener("input", () => {
    if (!started) {
        started = true;
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                disableInput();
                checkAccuracy();
            } else {
                timeLeft--;
                document.getElementById("timer").innerText = timeLeft;
                progressBar.style.width = `${(timeLeft / 60) * 100}%`; // Update progress bar
            }
        }, 1000);
    }
    updateWord();
    highlightWords();
});

function disableInput() {
    inputField.style.background = "red";
    inputField.style.color = "white";
    inputField.style.border = "2px solid red";
    inputField.style.cursor = "not-allowed";
    inputField.disabled = true;
}

function updateWord() {
    let inputVal = inputField.value.trim();
    let words = inputVal.split(/\s+/);
    let lastWord = words.length > 0 ? words[words.length - 1] : "-";
    document.getElementById("wordCount").innerText = lastWord;
}

function highlightWords() {
    let inputWords = inputField.value.trim().split(/\s+/);
    let quoteWords = fetchedQuote.split(" ");
    let spans = document.querySelectorAll("#paragraph .word");

    correctWords = 0;
 mistakes=0;
    spans.forEach((span, index) => {
        if (index < inputWords.length) {
            if (inputWords[index] === quoteWords[index]) {
                span.style.color = "green";
                correctWords++;
            } else {
                span.style.color = "red";
                mistakes++;
            }
        } else {
            span.style.color = "black";
        }
    });

    updateScore();
}

function updateScore() {
    let score = Math.round((correctWords / totalWords) * 100);
    scoreText.innerText = `${score}`;

    let offset = 282.74 - (score / 100) * 282.74;
    scoreCircle.style.strokeDashoffset = offset;
}
function checkAccuracy() {
    let userText = inputField.value.trim(); 
    let originalText = fetchedQuote.trim(); 

    let inputWords = userText.split(/\s+/); 
    let quoteWords = originalText.split(/\s+/); 

    let spans = document.querySelectorAll("#paragraph .word"); 
    let correctWords = 0;
    let mistake = 0;


    spans.forEach((span, index) => {
        if (index < inputWords.length) { 
            if (inputWords[index] === quoteWords[index]) {
                correctWords++; 
            } else {
                mistake++; 
            }
        } else {
            mistake++; 
        }
    });


    if (mistake === 0) {
        alert(`✅ Successfully scored to pass! You got all ${correctWords} words correct.`);
    } else {
        alert(`❌ Failed! You made ${mistake} mistakes.`);
    }
}



function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    started = false;
    document.getElementById("timer").innerText = timeLeft;
    progressBar.style.width = "100%"; 
    inputField.value = "";
    inputField.style.background = "white";
    inputField.style.color = "black";
    inputField.style.border = "1px solid black";
    inputField.style.cursor = "text";
    inputField.disabled = false;
    document.getElementById("wordCount").innerText = "-";
    correctWords = 0;
    scoreText.innerText = "0";
    scoreCircle.style.strokeDashoffset = "282.74";
    fetchQuote(); 
}