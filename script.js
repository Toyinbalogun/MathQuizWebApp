//***********************************************************************************//
//******************************* HEADER *****************************************//
//***********************************************************************************//
//TO DO --> get timer to diplay time and decrement per 1sec per 1000millisec
let timerContainerDiv = $("#time-container");
let timerContainerSpan = $("#time-left");
let timeLeft;

//***********************************************************************************//
//On click of the view highscore button the game should hold and go to highscore page//
//***********************************************************************************//

$('#view-hs').on('click',function(){
    $('#start-page').hide()
    $('#questions-page').hide()
    $('#summary-page').hide()
    $('#highscore-page').show()
    clearInterval(interval)
})


questionIndex = 0;
score = 0;
correctQuestionCheck = 0;

let questionsBank = [
    { //Q1
    title: "What is 1 + 2?",
    answers: ['A:  4','B:  5','C:  3','D:  6'],
    correct: 2 //index of correct answer
    },
    
    {//Q2
    title: "what is 4 * 2?",
    answers: ['A:  10','B:  8','C:  22','D:  11'],
    correct: 1
    },
   
    {//Q3
    title: "what is  42 - 18?",
    answers: ['A:  24','B:  60','C:  2','D:  36'],
    correct: 0
    },
    
    {//Q4
    title: "what is 1440/19?",
    answers: ['A:  22', 'B:  19','C:  12','D:  15'],
    correct: 3 
    }
]

//***********************************************************************************//
//******************************* FUNCTIONS *****************************************//
//***********************************************************************************//

function startTimer() {
    interval = setInterval(function() {
      timeLeft--;
      timerRender();
    }, 1000);
}

function timerRender() {
    if (timeLeft < 0) {
      alert("Time up!");
      timeLeft++;
    //   endQuiz(); //summary page
    } else {
      timerContainerSpan.text(timeLeft);
    }
}

function showQuestion(){
    let question = questionsBank[questionIndex];
    $('#question-title').text(question.title);
    $('#ans-Options').html('');
    
    for(let i=0; i < question.answers.length;i++){
      $('#ans-Options').append("<li><button class='btn btn-primary btn-lg m-1' id='" +i+ "'>" + question.answers[i]+ "<button></li>") //set id to position of index on ans array
    }
    
}


//***********************************************************************************//
//**************************** EVENT HANDLERS ***************************************//
//***********************************************************************************//

$('#start-button').click(function(e){
    e.preventDefault();
    $('#start-page').hide();
    timeLeft = 80;
    timerRender();
    startTimer();
    $('#questions-page').show();
    showQuestion();
})

    