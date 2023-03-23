const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

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

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
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

        getNewQuestion();
    });
})

startGame();