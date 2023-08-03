const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup_info');
const exitBtn = document.querySelector('.exit_btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue_btn');
const quizSection = document.querySelector('.quiz_section');
const quizBox = document.querySelector('.quiz_box');
const resultBox = document.querySelector('.result_box');
const tryAgainBtn = document.querySelector('.tryAgain_btn');
const goHomeBtn = document.querySelector('.goHome_btn');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};



continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    
    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
};

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;


const nextBtn = document.querySelector('.next_btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else {
        console.log('Question complete');
        showResultBox();
    }
};

const optionList = document.querySelector('.option_list');

const showQuestions = (index) => {
    const questionText = document.querySelector('.question_text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question} `

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
};


const optionSelected = (answer) => {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else {
        answer.classList.add('incorrect');
    }


    for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent == correctAnswer) {
            optionList.children[i].setAttribute('class', 'option correct');
        }
    };



    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    };

    nextBtn.classList.add('active');
};

const questionCounter = (index) => {
    const questionTotal = document.querySelector('.question_total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`
};


const headerScore = () => {
    const headerScoreText = document.querySelector('.header_score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
};

const showResultBox = () => {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score_text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular_progress');
    const progressValue = document.querySelector('.progress_value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094, ${progressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;


        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }

    }, speed)
};