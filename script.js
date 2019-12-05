var startButton=document.querySelector("#btn");
var timer=document.querySelector("#timer");
var modalBody=document.querySelector(".modal-body");
var modalFooter=document.querySelector(".modal-footer");
var modalTitle=document.querySelector("#exampleModalLabel");
var radio=document.querySelectorAll(".radio");
var nextButton=document.querySelector("#next");
var radioInput="<input type=\"radio\" name=\"quiz\">";
var answer=document.querySelector("#answer");
var doneBtn=document.querySelector("#done");
var name=document.querySelector("#name");
var body=document.querySelector("#body");
var viewHighScores=document.querySelector("#ViewHighScores");
var summary=document.querySelector("#summary");
var submitBtn=document.querySelector("#submit");
var hideBtn=document.querySelector("#hide-btn");
var holder=document.querySelector("#holder");

//localStorage.clear();
timer.textContent=75;
getHighestScoredPerson();

startButton.addEventListener("click", function(){
  $(holder).css("display","none");
  showButton("Next");
displayQuiz();
var myVar = setInterval(function(){
  if ( timer.textContent==0) {
    clearInterval(myVar);
  }
  timer.textContent--;
  if(timer.textContent==1){
    displayScore();
    askInfo();
  }
}, 1000);
});


var totalQuestions=5;
 var rightAnswer="";
 var currentQuiz=-1;
 var correctAnswerCount=0;
 var wrongAnswerCount=0;
 var skippedAnswer=0;
 var finalScore=0;
var clickCount=0;




 function displayQuiz(){
   clickCount=0;
    answer.textContent="";
     currentQuiz+=1;
   modalTitle.textContent=questions[currentQuiz].title;
   for(var m=0; m<questions[currentQuiz].choices.length; m++){
    radio[m].innerHTML=radioInput+questions[currentQuiz].choices[m];
   }
   rightAnswer=questions[currentQuiz].answer;
   console.log("index: "+currentQuiz);
  
   if(currentQuiz==4){
    showButton("Done");
   }
}
 

 function calculateFinalScore(){
     finalScore=20*correctAnswerCount;
     return finalScore;}
 
function displayScore(){
  skippedAnswer=totalQuestions-(correctAnswerCount+wrongAnswerCount);
   var  p = document.createElement("div");
    p.setAttribute("id","score");
    p.innerHTML = "Correst answer: "+correctAnswerCount+"<br/>"+" Wrong answer: "+wrongAnswerCount+"<br/>"+"Skipped question: "+skippedAnswer+
    "<br/>"+"Your final score: "+calculateFinalScore();
    modalBody.appendChild(p);
}
  
      
      viewHighScores.addEventListener("click", function(){
       displayTitle();
      // lockButton("ViewHighScores");
       getHighestScoredPerson();
       showButton("Hide","Start Quiz");
       
      })
  

function displayTitle(){
var d=document.createElement("h4");
d.setAttribute("id","highscores");
d.style.color="black";
d.innerHTML= getHighestScoredPerson();
holder.appendChild(d);
}


$(".radio").on("click",function(){
  clickCount++;
 var currentAnswer=(this).textContent;
 if(clickCount==1){
 if(currentAnswer==rightAnswer){
     answer.textContent="Correct!"
     answer.style.color="green";
     correctAnswerCount++;
 }else if(currentAnswer!=rightAnswer){
     answer.textContent="Incorrect! deduct 15 seconds from remaining seconds"
     answer.style.color="red";
     wrongAnswerCount++;
     if(timer.textContent>=15){
   timer.textContent=timer.textContent-15;
     }else{
         timer.textContent=0;
     }
 }
}
});


    nextButton.addEventListener("click", displayQuiz);
  

   function askInfo(){
    answer.textContent="";
    blockElements(radio);
   var x= document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("id","input");
    x.setAttribute("placeholder", "Enter your name...");
    modalBody.appendChild(x);
    modalTitle.textContent="Please enter your name on following input box!";
    showButton("Submit");
   }


   


function blockElements(radio) {
    for(var i=0; i<radio.length; i++){
        if (radio[i].style.display === "none") {
            radio[i].style.display = "block";
          } else {
            radio[i].style.display = "none";
          }
        }
   }

   function lockButton(id){
       document.getElementById(id).disabled=true;
   }

   function lockElementButton(element){
  element.disabled=true;
   }



doneBtn.addEventListener("click",function(){
  displayScore();
  askInfo();
  timer.textContent="";
});


submitBtn.addEventListener("click",function(){

  var inputValue=document.querySelector("#input");
  localStorage.setItem("game_"+inputValue.value,finalScore);
  location.reload();
})

getHighestScoredPerson();


/* this function displays one parameter button and hides the rest */
   function showButton(...buttonNames){

      var btnArr= document.getElementsByTagName("button");
      for(var i=0; i<btnArr.length; i++){
          if(buttonNames.includes(btnArr[i].textContent)){
              btnArr[i].style.display="block";
          }else{
            btnArr[i].style.display="none";
          }
      }
   }

  
  
   function getHighestScoredPerson(){
     var max=0;
     var name="";
   for(var i=0; i<localStorage.length; i++){
     var key=localStorage.key(i);
     if(key.startsWith("game")){
       var value=localStorage.getItem(key);
      if(parseInt(value)>max){
        max=value;
        name=key;
      }
     }
   }
  return name.substring(5)+" got "+max;
   }

hideBtn.addEventListener("click",function(){
location.reload();
});

