const answersHTML = document.querySelector('.answers');
const timeHTML = document.querySelector('.time');
const questionNumberHTML = document.querySelector('.question-number');
const questionHTML = document.querySelector('.question');
const next = document.querySelector('#next');
const time = 1;
let sec = time * 60;
const mins = sec / 60;
console.log(time)
const questions = [{
  question: 'Which of the following is a programing language',
  answers:{
    a: 'HTML',
    b: 'CSS',
    c: 'JavaScript',
    d: 'JSON',
    right: 'c'
  }
},{
  question: 'Which of the following is not use for coditional statement in JavaScript',
  answers:{
    a: 'Switch case',
    b: 'Tenary Operator',
    c: 'If else',
    d: 'Array method',
    right: 'd'
  }
},{
  question: 'How do we check if a value is NaN',
  answers: {
    a: 'value.check(NaN)',
    b: 'Number.isNaN()',
    c: 'isNaN(value)',
    d: 'value.isNaN()',
    right: 'c'
  }
},{
  question: 'Which of the following method is use to covert an object to a string',
  answers:{
    a: 'JSON.stringify(object)',
    b: 'obect.toString',
    c: 'object.from.object.toSteong',
    d: 'obkect.stringify',
    right: 'a'
  }
},{
  question: 'What is purpose of typeof in JavaScript',
  answers: {
    a: 'To check if a variable is denfined',
    b: 'To determine the data type of a variable',
    c: 'To create a new data type',
    d: 'To covert to anothet data type',
    right: 'b'
  }
}]

let questionIndex = 0;
let score = 0;

function loadQuestion(){
  let answer = ''
  questionHTML.innerHTML = questions[questionIndex].question;
  questionNumberHTML.innerHTML = `${questionIndex + 1} of ${questions.length}`
  answer += `<label>
               <input type="radio" value="a" name="answer" class="option">${questions[questionIndex].answers.a}
             </label>`
  answer += `<label>
               <input type="radio" value="b" name="answer" class="option">${questions[questionIndex].answers.b}
             </label>`
  answer += `<label>
              <input type="radio" value="c" name="answer" class="option">${questions[questionIndex].answers.c}
              </label>`
   answer += `<label>
                <input type="radio" value="d" name="answer" class="option">${questions[questionIndex].answers.d}
               </label>`
   
   answersHTML.innerHTML = answer;
}

function nextQuestion (){
  document.querySelectorAll('.option').forEach((ans) =>{
    if(ans.checked){
      if(ans.value === questions[questionIndex].answers.right){
        score++;
      }
      questionIndex++;
      if(questionIndex < questions.length - 1){
        loadQuestion();
      } else if (questionIndex === questions.length - 1){
        loadQuestion()
        next.innerHTML = 'Submit'
      }
    }
  })
}

loadQuestion();
next.addEventListener('click', () =>{
  if(next.innerHTML === 'Submit'){
    submit()
  }else if(next.innerHTML === 'Take quiz again'){
    location.reload();
  }else{
    nextQuestion()
  }
});

function submit(){
  document.querySelectorAll('.option').forEach((ans) =>{
      if(ans.checked){
        if(ans.value === questions[questionIndex].answers.right){
          score++;
        }
      }
    })
    questionHTML.innerHTML = '';
    answersHTML.innerHTML = `You score ${score} out of ${questions.length} <br> You got ${score / questions.length * 100}% of the questions right`
    answersHTML.style.textAlign = 'center'
    answersHTML.style.fontSize  = '2rem'
    next.innerHTML = 'Take quiz again'
}

function timer(){
  let remSec = Math.floor(sec % 60);
  let remMins = Math.floor(mins / 60 % 60);
  console.log(remMins)
  remSec = remSec < 10 ? `0${remSec}` : remSec;
  remMins = remMins < 10 ? `0${remMins}` : remMins;
  
  timeHTML.innerHTML = `${remMins}:${remSec}`
  console.log(timeHTML.innerHTML)
  sec--;
}

const timeInt = setInterval(()=>{
  timer()
},1000)

setTimeout(()=>{
  submit()
  clearInterval(timeInt);
  timeHTML.innerHTML = '00:00'
},sec * 1000)