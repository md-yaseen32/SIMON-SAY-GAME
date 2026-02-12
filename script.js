let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let btns = ["red","yellow","purple","blue"];
let h2 = document.querySelector("h2");

// Modal functionality
const modal = document.getElementById("instructionsModal");
const helpBtn = document.getElementById("helpBtn");
const closeBtn = document.getElementsByClassName("close")[0];

helpBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game has started");
        started = true;
    }
    levelUp();
});
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
}
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4); // Fixed: was 3, should be 4 for all colors
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            h2.innerText = "Correct! Get ready for next level...";
            setTimeout(levelUp,1000);
        }
    }else{
        // Show game over message with score
        h2.innerHTML = `🎮 <b>GAME OVER!</b> 🎮<br><br>🏆 Your Score: <b>${level}</b> 🏆<br><br>Press Any Key to Start Again`;
        
        // Flash red background for game over effect
        document.body.style.background = "linear-gradient(135deg, #ff4757, #ff6348)";
        
        // Add shake animation to buttons
        let allBtns = document.querySelectorAll(".btn");
        allBtns.forEach(btn => {
            btn.style.animation = "shake 0.5s";
        });
        
        // Reset after 2 seconds so user can see their score
        setTimeout(function() {
            document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
            allBtns.forEach(btn => {
                btn.style.animation = "";
            });
            reset();
        },2000);
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started = false; // Fixed: was == should be =
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Press any key to start";
}

// Show welcome message on load
window.addEventListener("load", function() {
    setTimeout(function() {
        modal.style.display = "block";
    }, 500);
});
