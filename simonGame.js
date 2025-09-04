let gameSeq = [];
let userSeq = [];
let h2 = document.querySelector('h2');
let btns = ["yellow", "red", "purple", "green"];
let highScore = localStorage.getItem("highScore") || 0;

let started = false;
let level = 0;

document.addEventListener(("keypress"), function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx){
    
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp(), 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was ${level}  <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
             document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        if(level > highScore){
            highScore = level;
            localStorage.setItem("highscore",highScore);
        }
        h2.innerHTML += `<br>High Score: ${highScore}`;
        reset();
    }
    
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener(("click"), btnPress);
}

function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}