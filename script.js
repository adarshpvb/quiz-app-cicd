let questions = [
    {
        ques: "What is the full form of DSA",
        options: [
            { text: "Data Structure", correct: true },
            { text: "Data", correct: false },
            { text: "Structure", correct: false },
            { text: "Data and Structure", correct: false },
        ],
    },
    {
        ques: "What is the full form of CTC",
        options: [
            { text: "Cost to Company", correct: true },
            { text: "Cost", correct: false },
            { text: "Company", correct: false },
            { text: "Data and cost", correct: false },
        ],
    },
    {
        ques: "What is the full form of SDE",
        options: [
            { text: "Software dev eng", correct: true },
            { text: "hardware", correct: false },
            { text: "Structure", correct: false },
            { text: "Data and hardware", correct: false },
        ],
    },
];

let queans = document.getElementsByClassName("queans")[0];
let question = document.getElementsByClassName("question")[0];
let answers = document.getElementsByClassName("answers")[0];
let nextBtn = document.getElementsByClassName("lastBtn")[0];
let timeDisplay = document.getElementsByClassName("timer")[0];
let startBtn = document.getElementsByClassName("startBtn")[0];


let currNo = 0;
let marks = 0;
let timeCount = 0;
let totalTime = 10;
let timeInterval;

startBtn.addEventListener("click",start)

function startTimer(){
    timeCount = 0;
    timeInterval = setInterval(()=>{
        timeCount++;
        updateTimerDisplay();
        if (timeCount>=totalTime){
            clearInterval(timeInterval);
            handleTimeUp();
        }
    },1000);
}

function updateTimerDisplay(){
    timeDisplay.innerHTML = `Time Left: ${totalTime - timeCount}`;
}

function handleTimeUp(){
    currNo = questions.length - 1;
    displayScore();
}

function start() {
    startBtn.style.display = "none";
    queans.style.display = "block";
    currNo = 0;
    marks = 0;
    nextBtn.innerHTML = "Next";
    startTimer();
    displayQn();
}

function handleClick(e) {
    const selectedBtn = e.target;
    if (selectedBtn.dataset.correct) {
        marks+=1;
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("wrong");
    }
    Array.from(answers.children).forEach((button) => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", ()=>{
    if (currNo<questions.length){
        nextQues();
    }
    else{
        start()
    }
});

function nextQues(){
    currNo+=1;
    if (currNo<questions.length){
        displayQn();
    }
    else{
        displayScore();
    }
}

function displayScore(){
    clearInterval(timeInterval);
    timeDisplay.innerHTML = `Time Left: 0`;
    nextBtn.innerHTML = "Restart Quiz";
    removeState();
    nextBtn.style.display = "block";
    question.innerHTML = `Your score: ${marks}/${questions.length}`;
}

function displayQn() {
    removeState();
    let currQues = questions[currNo];
    let quesNo = currNo + 1;
    question.innerHTML = quesNo + ". " + currQues.ques;
    currQues.options.forEach((option) => {
        const button = document.createElement("button");
        button.innerHTML = option.text;
        button.classList.add("btn");
        answers.appendChild(button);
        if (option.correct) {
            button.dataset.correct = option.correct;
        }
        button.addEventListener("click", handleClick);
    });
}

function removeState() {
    nextBtn.style.display = "none";
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
}




