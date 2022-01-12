// let highScore=document.getElementById('high-score');
// let currScore=document.getElementById('curr-score');

// let highScore=document.querySelector('#high-score');
// let currScore=document.querySelector('#curr-score');
let score=document.querySelector('.score')
let startScreen=document.querySelector('.startScreen');
// let startBtn=document.querySelector('.start-btn');
let gameArea=document.querySelector('.gameArea');
// console.log(startBtn);
startScreen.addEventListener('click',function(){

    startGame();

});


let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
}
let player={
    start:false,
    x:0,
    y:0,
    score:0,
    speed:5
}

document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff)

function pressOn(e){
    e.preventDefault();
    keys[e.key]=true;
    // console.log(keys);
}

function pressOff(e){
    e.preventDefault();
    keys[e.key]=false;
    // console.log(keys);
}

function createLines(n){
    for(let x=0;x<n;x++){
        let div=document.createElement("div");
        div.classList.add("line");
        div.y=x*150;
        div.style.top=(x*150)+"px";
        gameArea.appendChild(div);
    }    
}

function isCollide(a,b){
    let aRect=a.getBoundingClientRect();
    let bRect=b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right))
}

function createCars(n){
    let road=gameArea.getBoundingClientRect();
    let roadWidth=road.width;
    for(let x=0;x<n;x++){
        let enemy=document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y=Math.floor((x+1)*500)*-1;
        enemy.style.top=(Math.random()*x*(roadWidth/n))+"px";
        enemy.style.backgroundColor=randomColor();

        enemy.style.left=Math.floor((x*roadWidth)/n)+"px";
        gameArea.appendChild(enemy);
    }   
}



function randomColor(){
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
    }

    let color= "#"+c()+c()+c();
    console.log(color);
    return color;
}

function startGame() {
    startScreen.classList.add('hide');
    // gameArea.classList.remove('hide');
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
    createLines(10);

    window.requestAnimationFrame(playGame);

    let car=document.createElement("div");
    car.setAttribute("class","car");
    gameArea.appendChild(car);

    createCars(10);

    player.x=car.offsetLeft;
    player.y=car.offsetTop;
}

function moveLines(){
    let lines=document.querySelectorAll(".line");
    lines.forEach(function(item){
        // console.log(item.y);
        if(item.y>1500){
            item.y-=1500;

        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
        // console.log(item.y);
    });
}

function moveEnemy(car){
    let elem=document.querySelectorAll(".enemy");
    let road=gameArea.getBoundingClientRect();
    let roadWidth=road.width;
    let n=elem.length;
    let cnt=0;
    elem.forEach(function(item){
        cnt++;
        if(isCollide(car,item)){
            console.log("HIT");
            endgame();
        }
        if(item.y>1500){
            item.y-=1500;
            item.style.left=Math.floor(Math.random()*cnt*(roadWidth/n))+"px";
            item.style.backgroundColor=randomColor();
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
        // console.log(item.y);
    });
}

function endgame(){
    player.start=false;
    score.innerHTML="GameOver<br>Score:"+player.score;
    startScreen.classList.remove('hide');

}


let curr_score=0;
function playGame(){
    // console.log("inplay");
    let car=document.querySelector('.car');
    moveLines();
    moveEnemy(car);
    let road=gameArea.getBoundingClientRect();

    // console.log(road)

    if(player.start){

        if(keys.ArrowUp && player.y >road.top){player.y-=player.speed};
        if(keys.ArrowDown && player.y < road.bottom){player.y+=player.speed;}
        if(keys.ArrowRight && player.x<(road.width-30)){player.x+=player.speed;}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed;}
        car.style.left=player.x+'px';
        car.style.top=player.y+'px';
        // console.log(player);
        window.requestAnimationFrame(playGame);   
        curr_score++;
        if(curr_score%5==0)
            player.score++;

        score.innerText="Score:"+player.score;
    }

}
