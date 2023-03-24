const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let nextQuestion = document.getElementById("nextQuestion");

nextQuestion.disabled = true;

let questions = [
    {
        question: "What is the formula for GDPr?",
        choice1: "no clue",
        choice2: "y=mx+b",
        choice3: "C+I+G+Xn",
        choice4: "idk",
        answer: 3
    },
    {
        question: "What should you do if you don't know the answer?",
        choice1: "nothing",
        choice2: "graph it out",
        choice3: "give up",
        choice4: "guess",
        answer: 2
    },
    {
        question: "What does PPC stand for?",
        choice1: "Production Possibilites Curve",
        choice2: "Pizza Proportions Constant",
        choice3: "People Place Corner",
        choice4: "Pretty Pasta Creator",
        answer: 1
    }
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 3;
localStorage.setItem("maxQuestions", MAX_QUESTIONS);

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        nextQuestion.disabled = false;

        nextQuestion.addEventListener('click', e => {
            selectedChoice.parentElement.classList.remove(classToApply);
        })
        
        /*setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);*/

    });
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();