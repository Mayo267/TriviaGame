    
$(document).ready(function(){
var options = [
    {
        question: "What did the crocodile swallow in Peter Pan?",
        choice: ["Alarm Clock", "Watch", 'Person', 'Cat'],
        answer: 0
    },
    {
        question: "What temperature does water boil at?",
        choice: ['0c', '80c', '100c', '50c'],
        answer: 2
    },
    {
        question: "Which is the only mammal that can't jump?",
        choice: ["Dolphin", "Elephant", 'Rat', 'Dog'],
        answer: 1
    },
    {
        question: "When did the first World War start?",
        choice: ["1920", "1900", '1886', '1914'],
        answer: 3
    },
    {
        question: "Who cut Van Gogh's ear?",
        choice: ["Himself", "His Wife", 'His Barber', 'His Son'],
        answer: 0
    },
    {
        question: "Name a famous detective who smoked a pipe and played the violin?",
        choice: ["S. Holmes", "E. Brown", 'A. Guy', 'G. Summers'],
        answer: 0
    },
    ];
 var correct = 0;
 var wrong = 0;
 var qCount = options.length;
 var unanswer = 0;
 var timer = 10;
 var intervalId;
 var running = false;
 var pick;
 var index;
 var holder = [];
 var userGuess ="";
$('#answers').empty();
$('#question').empty();
$('.restart').hide();

 $('.start').on("click", function(){
     $('.start').hide();

     displayQuestion();
     runTimer();
     for(var i = 0; i < options.length; i++){
         holder.push(options[i]);
     }
 })

 

 function runTimer(){
     if(!running){
         intervalId = setInterval(decrement, 1000);
         running = true;
     }
 }


 function decrement(){
     $('#timeLeft').html('Time Left: ' + timer);
     timer--;

     if(timer === -1){
         $('.answerChoice').empty();
         stop();
         $('#answers').html("Time is up the answer is " + pick.choice[pick.answer] + "!");
         $('.answerChoice').empty();
         unanswer++;
         
         setTimeout(displayQuestion, 4000);      
     }
 }


 function stop(){
     running = false;
     clearInterval(intervalId);
 }



 function displayQuestion(){
     $('.restart').hide();
     $('.answerChoice').empty();
     $('#answers').empty();
     timer = 10;
     runTimer();
     
     
     index = Math.floor(Math.random() * options.length);
     pick = options[index];

         $('#question').html("<h2>" + pick.question + "</h2>");
         for(var i = 0; i < pick.choice.length; i++){
             var userChoice = $('<div>');
             userChoice.addClass("answerChoice");
             userChoice.html(pick.choice[i]);
             userChoice.attr("data-guessvalue", i);
             $('#answers').append(userChoice);
        
     }
 

 $('.answerChoice').on("click", function(){
     userGuess = parseInt($(this).attr("data-guessvalue"));
     $('.answerChoice').empty();
     setTimeout(decrement, 4000);

     if(userGuess === pick.answer){
        $('.answerChoice').empty();
        
         correct++;
         console.log("correct", correct);
         userGuess = "";
         $("#answers").html("Correct!");
         stop();
        $('#answers').empty();
         displayQuestion();
        
         
         runTimer();
     }else{
        $('.answerChoice').hide();
         wrong++;
         console.log("wrong",wrong);
         userGuess = "";
         stop();
         $('#answers').html("Incorrect the answer is " + pick.choice[pick.answer] + "!");
         $('.answerChoice').empty();
         
         setTimeout(displayQuestion, 4000);
         timer = 10;
         runTimer();
     }
    

})
if ((wrong + correct + unanswer) >= qCount) {
    timer = 10000;
    
$("#question").empty();
$('#timeLeft').hide();

$('.answerChoice').hide();
$("#question").html("<h3>Game Over!  Your Score: </h3>");
$("#answers").append("<h4> Correct: " + correct + "</h4>" );
$("#answers").append("<h4> Incorrect: " + wrong + "</h4>" );
$("#answers").append("<h4> Unanswered: " + unanswer + "</h4>" );


    correct = 0;
    wrong = 0;
    unanswer = 0;
    console.log("unanswer", unanswer);
    
 }

 }
 })
