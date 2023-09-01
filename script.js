const questions = [
    {
        question: "What is the chemical symbol for the element gold?",
        answers: [
            { text: "a) Si", correct: false },
            { text: "b) Fe", correct: false },
            { text: "c) Ag", correct: false },
            { text: "d) Au", correct: true },
        ],
    },
    {
        question: "What gas do plants release during photosynthesis?",
        answers: [
            { text: "a) Oxygen", correct: true },
            { text: "b) Carbon dioxide", correct: false },
            { text: "c) Nitrogen", correct: false },
            { text: "d) Hydrogen", correct: false },
        ],
    },
    {
        question: "Which planet is often called the 'Red Planet'?",
        answers: [
            { text: "a) Earth", correct: false },
            { text: "b) Mars", correct: true },
            { text: "c) Venus", correct: false },
            { text: "d) Jupiter", correct: false },
        ],
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "a) Beijing", correct: false },
            { text: "b) Seoul", correct: false },
            { text: "c) Tokyo", correct: true },
            { text: "d) Bangkok", correct: false },
        ],
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "a) African elephant", correct: false },
            { text: "b) Blue whale", correct: true },
            { text: "c) Giraffe", correct: false },
            { text: "d) Polar bear", correct: false },
        ],
    },
    {
        question: "Which gas is responsible for the Earth's ozone layer in the stratosphere?",
        answers: [
            { text: "a) Oxygen", correct: false },
            { text: "b) Carbon dioxide", correct: false },
            { text: "c) Ozone", correct: true },
            { text: "d) Nitrogen", correct: false },
        ],
    },
    {
        question: "What is the world's largest river by discharge volume?",
        answers: [
            { text: "a) Amazon River", correct: true },
            { text: "b) Nile River", correct: false },
            { text: "c) Mississippi River", correct: false },
            { text: "d) Yangtze River", correct: false },
        ],
    },
    {
        question: "Which planet is known as the 'Morning Star' or 'Evening Star' and is often visible shortly before sunrise or after sunset?",
        answers: [
            { text: "a) Mars", correct: false },
            { text: "b) Venus", correct: true },
            { text: "c) Jupiter", correct: false },
            { text: "d) Saturn", correct: false },
        ],
    },
    {
        question: "Which gas is known as 'Laughing Gas'?",
        answers: [
            { text: "a) Oxygen", correct: false },
            { text: "b) Nitrous oxide", correct: true },
            { text: "c) Carbon dioxide", correct: false },
            { text: "d) Helium", correct: false },
        ],
    },
    {
        question: "What is the currency of Australia?",
        answers: [
            { text: "a) Dollar", correct: true },
            { text: "b) Euro", correct: false },
            { text: "c) Yen", correct: false },
            { text: "d) Pound", correct: false },
        ],
    },
];

const startButton = document.getElementById("start-btn");
const welcomeMessage = document.getElementById("welcome");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    if (quizStarted) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else if (currentQuestionIndex === questions.length) {
            showScore();
        } else {
            startQuiz();
        }
    } else {
        startQuiz();
    }
});

function startQuiz() {
    if (!quizStarted || currentQuestionIndex === questions.length) {
        welcomeMessage.style.display = "none";
        questionElement.style.display = "block";
        answerButtons.style.display = "block";
        nextButton.style.display = "none";
        currentQuestionIndex = 0;
        score = 0;
        quizStarted = true;
        showQuestion();
    } else {
        showQuestion();
    }
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer); // Updated event listener
        button.dataset.correct = answer.correct; // Added dataset to store correctness
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.style.display = "none";
    Array.from(answerButtons.children).forEach((button) => {
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; 
    } else {
        selectedBtn.classList.add("incorrect");
    }
    
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";

    if (currentQuestionIndex < questions.length - 1) {
        nextButton.textContent = "Next";
    } else {
        nextButton.textContent = "Finish";
    }
}


function showScore() {
    resetState();
    questionElement.textContent = `You Scored ${score} out of ${questions.length}`;
    nextButton.textContent = "Play Again";
    nextButton.style.display = "block";
    quizStarted = false;
}
