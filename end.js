const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");
const maxQuestions = localStorage.getItem("maxQuestions");
finalScore.innerText = `${mostRecentScore} or ${Math.round((mostRecentScore/maxQuestions)*100)}%`;