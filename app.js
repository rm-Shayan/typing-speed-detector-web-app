const randomText = async () => {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        if (response.ok) {  
            const data = await response.json();
            return data;  
        } else {
            console.log('Error: Failed to fetch data');
        }
    } catch (error) {
        document.getElementById("paragraph").innerHTML = "Error in loading";
    }
};

// Fetch random quote and display
randomText().then(data => displayQuote(data)); 

function displayQuote(para) {
    document.getElementById("paragraph").innerHTML = `<strong>${para?.author}</strong>: <br> ${para?.quote}`;
}

// Timer & Input Tracking
let timeLeft = 60;
let timer;
let started = false;

const inputField = document.getElementById("typingInput");

inputField.addEventListener("input", () => {
    if (!started) {
        started = true;
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                disableInput();
            } else {
                timeLeft--;  // Corrected from timerLeft-- to timeLeft--
                document.getElementById("timer").innerText = timeLeft;
                updateWord(); // Update the last word typed
            }
        }, 1000);
    }
});

// Disable input field when time runs out
function disableInput() {
    inputField.style.background = "red";
    inputField.style.color = "white";
    inputField.style.border = "2px solid red";
    inputField.style.padding = "10px";
    inputField.style.borderRadius = "10px";
    inputField.style.boxShadow = "0 0 10px red";
    inputField.style.cursor = "not-allowed";
    inputField.style.pointerEvents = "none";
    inputField.style.opacity = "0.5";
    inputField.disabled = true;
}


function updateWord() {
    let inputVal = inputField.value.trim();
    let words = inputVal.split(/\s+/);
    let lastWord = words.length > 0 ? words[words.length - 1] : "";
    document.getElementById("wordCount").innerText = lastWord;
}


function resetTimer() {
    clearInterval(timer);
    timeLeft = 60;
    document.getElementById("timer").innerText = timeLeft;
    inputField.value = "";
    inputField.style.background = "white";
    inputField.style.color = "black";
    inputField.style.border = "1px solid black";
    inputField.style.padding = "10px";
    inputField.style.borderRadius = "10px";
    inputField.style.boxShadow = "0 0 10px black";
    inputField.style.cursor = "text";
    inputField.style.pointerEvents = "auto";
    inputField.style.opacity = "1";
    inputField.disabled = false;
    started = false;
    randomText().then(data => displayQuote(data)); 
    
}
