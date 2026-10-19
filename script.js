// ===== 1. GAME QUESTIONS =====

const questions = [
    {
        movie: "3 Idiots",
        emojis: "🎓 🤪 📚",
        category: "bollywood",
        hint: "Three engineering students and a famous college.",
        options: ["3 Idiots", "Chhichhore", "Munna Bhai M.B.B.S.", "Taare Zameen Par"]
    },
    {
        movie: "Dangal",
        emojis: "🤼‍♀️ 🥇 👨‍👧‍👧",
        category: "bollywood",
        hint: "A father trains his daughters to become wrestlers.",
        options: ["Sultan", "Dangal", "Mary Kom", "Bhaag Milkha Bhaag"]
    },
    {
        movie: "Sholay",
        emojis: "🤠 🔫 🏜️",
        category: "bollywood",
        hint: "A classic Hindi film featuring Jai and Veeru.",
        options: ["Don", "Sholay", "Deewar", "Agneepath"]
    },
    {
        movie: "Zindagi Na Milegi Dobara",
        emojis: "🚗 🌊 🪂",
        category: "bollywood",
        hint: "Three friends go on a road trip through Spain.",
        options: ["Dil Chahta Hai", "Yeh Jawaani Hai Deewani", "Zindagi Na Milegi Dobara", "Rock On!!"]
    },
    {
        movie: "Jab We Met",
        emojis: "🚆 💃 ❤️",
        category: "bollywood",
        hint: "A talkative girl meets a quiet businessman on a train.",
        options: ["Jab We Met", "Veer-Zaara", "Kal Ho Naa Ho", "Hum Tum"]
    },
    {
        movie: "Harry Potter",
        emojis: "⚡ 🧙‍♂️ 🪄",
        category: "hollywood",
        hint: "A young wizard attends Hogwarts.",
        options: ["Harry Potter", "The Lord of the Rings", "Doctor Strange", "Fantastic Beasts"]
    },
    {
        movie: "Titanic",
        emojis: "🚢 🧊 💔",
        category: "hollywood",
        hint: "A famous ship hits an iceberg.",
        options: ["Avatar", "Titanic", "The Notebook", "Life of Pi"]
    },
    {
        movie: "Finding Nemo",
        emojis: "🐠 🌊 🔎",
        category: "hollywood",
        hint: "A clownfish searches the ocean for his son.",
        options: ["Shark Tale", "The Little Mermaid", "Finding Nemo", "Luca"]
    },
    {
        movie: "The Lion King",
        emojis: "🦁 👑 🌅",
        category: "hollywood",
        hint: "A young lion grows up to become king.",
        options: ["Madagascar", "The Jungle Book", "The Lion King", "Ice Age"]
    },
    {
        movie: "Frozen",
        emojis: "❄️ 👸 ⛄",
        category: "hollywood",
        hint: "Two sisters and a magical icy kingdom.",
        options: ["Frozen", "Tangled", "Brave", "Moana"]
    },
    {
        movie: "Jawan",
        emojis: "🎭 🚇 💥",
        category: "bollywood",
        hint: "An action film starring Shah Rukh Khan in multiple looks.",
        options: ["Pathaan", "Jawan", "War", "Raees"]
    },
    {
        movie: "Home Alone",
        emojis: "🏠 👦 🎄",
        category: "hollywood",
        hint: "A boy is accidentally left behind during Christmas.",
        options: ["Elf", "The Grinch", "Home Alone", "Matilda"]
    }
];


// ===== 2. CONNECT HTML ELEMENTS =====

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const categorySelect = document.getElementById("category");
const startButton = document.getElementById("start-btn");
const quitButton = document.getElementById("quit-btn");
const hintButton = document.getElementById("hint-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

const scoreDisplay = document.getElementById("score");
const questionNumber = document.getElementById("question-number");
const timerDisplay = document.getElementById("timer");
const progressFill = document.getElementById("progress-fill");
const emojiClue = document.getElementById("emoji-clue");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const hintText = document.getElementById("hint-text");

const resultEmoji = document.getElementById("result-emoji");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const finalScore = document.getElementById("final-score");
const correctCount = document.getElementById("correct-count");


// ===== 3. GAME VARIABLES =====

let gameQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let timeLeft = 15;
let timer;
let answered = false;


// ===== 4. SHOW THE CORRECT SCREEN =====

function showScreen(screenToShow) {
    welcomeScreen.classList.remove("active");
    quizScreen.classList.remove("active");
    resultScreen.classList.remove("active");

    screenToShow.classList.add("active");
}


// ===== 5. START THE GAME =====

function startGame() {
    const selectedCategory = categorySelect.value;

    if (selectedCategory === "mixed") {
        gameQuestions = [...questions];
    } else {
        gameQuestions = questions.filter(function (question) {
            return question.category === selectedCategory;
        });
    }

    // Shuffle the order of questions.
    gameQuestions.sort(function () {
        return Math.random() - 0.5;
    });

    // Keep up to 5 questions for one game.
    gameQuestions = gameQuestions.slice(0, 5);

    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;

    scoreDisplay.textContent = score;

    showScreen(quizScreen);
    showQuestion();
}


// ===== 6. DISPLAY A QUESTION =====

function showQuestion() {
    clearInterval(timer);

    answered = false;
    timeLeft = 15;

    const currentQuestion = gameQuestions[currentQuestionIndex];

    questionNumber.textContent =
        "QUESTION " + (currentQuestionIndex + 1) +
        " OF " + gameQuestions.length;

    emojiClue.textContent = currentQuestion.emojis;
    timerDisplay.textContent = "⏱ " + timeLeft + "s";

    progressFill.style.width =
        (currentQuestionIndex / gameQuestions.length) * 100 + "%";

    feedback.textContent = "";
    hintText.textContent = "";

    hintButton.disabled = false;
    nextButton.disabled = true;

    // Mix the answer options so their order changes.
    const shuffledOptions = [...currentQuestion.options];

    shuffledOptions.sort(function () {
        return Math.random() - 0.5;
    });

    optionsContainer.innerHTML = "";

    shuffledOptions.forEach(function (option) {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", function () {
            checkAnswer(option, button);
        });

        optionsContainer.appendChild(button);
    });

    startTimer();
}


// ===== 7. CHECK THE ANSWER =====

function checkAnswer(selectedAnswer, selectedButton) {
    if (answered) {
        return;
    }

    answered = true;
    clearInterval(timer);

    const currentQuestion = gameQuestions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll("button");

    optionButtons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === currentQuestion.movie) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === currentQuestion.movie) {
        score += 10;
        correctAnswers++;

        feedback.textContent = "🎉 Correct! Great job!";
        feedback.style.color = "#4ade80";
    } else {
        selectedButton.classList.add("wrong");

        feedback.textContent =
            "❌ Not quite! The answer is " + currentQuestion.movie + ".";

        feedback.style.color = "#f87171";
    }

    scoreDisplay.textContent = score;
    progressFill.style.width =
        ((currentQuestionIndex + 1) / gameQuestions.length) * 100 + "%";

    hintButton.disabled = true;
    nextButton.disabled = false;

    if (currentQuestionIndex === gameQuestions.length - 1) {
        nextButton.textContent = "See Results →";
    } else {
        nextButton.textContent = "Next Question →";
    }
}


// ===== 8. COUNTDOWN TIMER =====

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;

        timerDisplay.textContent = "⏱ " + timeLeft + "s";

        if (timeLeft <= 5) {
            timerDisplay.style.color = "#f87171";
        } else {
            timerDisplay.style.color = "#fcd34d";
        }

        if (timeLeft <= 0) {
            clearInterval(timer);

            if (!answered) {
                answered = true;

                const currentQuestion =
                    gameQuestions[currentQuestionIndex];

                const optionButtons =
                    optionsContainer.querySelectorAll("button");

                optionButtons.forEach(function (button) {
                    button.disabled = true;

                    if (button.textContent === currentQuestion.movie) {
                        button.classList.add("correct");
                    }
                });

                feedback.textContent =
                    "⏰ Time's up! The answer is " +
                    currentQuestion.movie + ".";

                feedback.style.color = "#fcd34d";

                hintButton.disabled = true;
                nextButton.disabled = false;

                progressFill.style.width =
                    ((currentQuestionIndex + 1) / gameQuestions.length) * 100 + "%";

                if (currentQuestionIndex === gameQuestions.length - 1) {
                    nextButton.textContent = "See Results →";
                } else {
                    nextButton.textContent = "Next Question →";
                }
            }
        }
    }, 1000);
}


// ===== 9. SHOW A HINT =====

function showHint() {
    if (answered) {
        return;
    }

    const currentQuestion = gameQuestions[currentQuestionIndex];

    hintText.textContent = "💡 Hint: " + currentQuestion.hint;
    hintButton.disabled = true;
}


// ===== 10. MOVE TO THE NEXT QUESTION =====

function nextQuestion() {
    if (!answered) {
        return;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < gameQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}


// ===== 11. SHOW THE FINAL RESULTS =====

function showResults() {
    clearInterval(timer);

    showScreen(resultScreen);

    finalScore.textContent = score;
    correctCount.textContent =
        correctAnswers + " out of " + gameQuestions.length + " correct";

    if (correctAnswers === gameQuestions.length) {
        resultEmoji.textContent = "🏆";
        resultTitle.textContent = "Movie Master!";
        resultMessage.textContent =
            "Perfect score! You really know your movies.";
    } else if (correctAnswers >= 3) {
        resultEmoji.textContent = "🎉";
        resultTitle.textContent = "Well Played!";
        resultMessage.textContent =
            "Great effort! You know quite a few movies.";
    } else {
        resultEmoji.textContent = "🎬";
        resultTitle.textContent = "Keep Practising!";
        resultMessage.textContent =
            "Give it another try and see if you can beat your score.";
    }

    nextButton.textContent = "Next Question →";
}


// ===== 12. RESTART THE GAME =====

function restartGame() {
    clearInterval(timer);
    timerDisplay.style.color = "#fcd34d";
    nextButton.textContent = "Next Question →";

    showScreen(welcomeScreen);
}


// ===== 13. BUTTON EVENTS =====

startButton.addEventListener("click", startGame);

hintButton.addEventListener("click", showHint);

nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", restartGame);

quitButton.addEventListener("click", function () {
    clearInterval(timer);
    timerDisplay.style.color = "#fcd34d";
    showScreen(welcomeScreen);
});