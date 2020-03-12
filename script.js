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
    showHighscore()
    clearInterval(interval)
})


questionIndex = 0;
score = 0;
correctAnsCheck = 0;
HighscoreArr = []

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
      timeLeft--
      timerRender()
    }, 1000)
}

function timerRender() {
    if (timeLeft < 0) {
      alert("Time up!")
      timeLeft++
      showSummary()
    } else {
      timerContainerSpan.text(timeLeft)
    }
}

function showQuestion(){
    let question = questionsBank[questionIndex]
    $('#question-title').text(question.title)
    $('#ans-Options').html('')
    
    for(let i=0; i < question.answers.length;i++){
      $('#ans-Options').append("<li><button class='btn btn-primary btn-lg m-1' id='" +i
      + "'>" + question.answers[i]+ "</button></li>") //set id to position of index on ans array
    }
    
}

function checkAnswer(selectedButton){
    let question = questionsBank[questionIndex];

    if (question.correct === selectedButton){
        score +=100
        correctAnsCheck +=1
    }
    else{
        timeLeft -=5
        timerContainerSpan.text(timeLeft)
    }
    //TO DO-->display whether wrong or right
    questionIndex++;
    if (questionIndex >= questionsBank.length){
        showSummary()
    }
    else{
        showQuestion()
    }
}

function showSummary(){
    $('#questions-page').hide()
    $('#summary-page').show()
    $('.correctAns').text("You scored " + correctAnsCheck + " out of " + questionsBank.length)
    $('.score').text("Your score is " + score)
    clearInterval(interval)
}

function showHighscore(){
    $('#summary-page').hide()
    $('#highscore-page').show()
    let highscoresList = $('#highscores-List');
    let Highscores = JSON.parse(localStorage.getItem("Highscores"))
    
    highscoresList.html("")

    highscoresList.append(Highscores.map(playerStats =>{
         return `<li class="high-score"> ${playerStats.uName} -  ${playerStats.uScore}</li>`;
     }).join(""));
    
}

function restartQuiz(){
    $('#highscore-page').hide()
    $('#start-page').show()
    questionIndex = 0
    score = 0
    correctAnsCheck = 0
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

//On clicking a button, add a selectedButton Class to el
$('#ans-Options').on('click', 'button', function(){ 
    $('.selectedButton').removeClass('selectedButton')
    $(this).addClass('selectedButton')

    if($('button.selectedButton').length){
        let selectedButton = parseInt($('button.selectedButton').prop('id'))
        checkAnswer(selectedButton)
    }
    else{
        alert('Please Select An Option!')
    }
})

$('#submitInitials').click(function(e){
    //let highscoresList = document.getElementById('highscores-List');
    
    let Highscores = (JSON.parse(localStorage.getItem("Highscores"))||[])
    e.preventDefault()
   
    let userInitials = $('#userInitials').val()
    let userScore = score
    //store users name and users score in an object class
    let userStats = { 
        uName: userInitials,
        uScore: userScore
    }

    HighscoreArr.push(userStats)
    HighscoreArr.sort((a,b)=> b.uScore - a.uScore)
    
    //saves just top 10 players
    HighscoreArr.splice(5) 
    //store in local storage
    localStorage.setItem('Highscores', JSON.stringify(HighscoreArr))
    showHighscore()
})

$('#restartButton').click(function(e){
    e.preventDefault()
    restartQuiz()
})
