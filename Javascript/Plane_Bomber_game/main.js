const score=document.querySelector(".score");
const gameArea=document.querySelector(".gameArea");
const startBtn=document.querySelector(".startBtn");


document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);
document.addEventListener("click",start);

let keys={
    space:false,
}

let player={
    score:0,
    speed:2,
    inplay:false

}

function pressOn(e) {
    e.preventDefault();     
    let tempKey=(e.key==" ")?"space":e.key;
    keys[tempKey]=true;
    // console.log(e);
}

function pressOff(e){
    e.preventDefault();     
    let tempKey=(e.key==" ")?"space":e.key;
    keys[tempKey]=false;
    // console.log(e);
}

function addClass(element,className){
    console.log(element+":"+className);
    element.classList.add(className);
}

function range(a,b){
    return Math.floor(Math.random()*b)+a;
}

function makeBomb(){
    if(player.ready && player.activeBomb<player.totalBombs ){
        player.score-=200;
        player.bombScore++;
        player.activeBomb++;
        let bomb=document.createElement("div");
        bomb.setAttribute("class","bomb");
        bomb.innerHTML=player.bombScore;

        bomb.x=player.x;
        bomb.y=player.y;
        bomb.style.left=bomb.x+"px";
        bomb.style.top=bomb.y+"px";
        gameArea.appendChild(bomb);
        player.ready=false;
        setTimeout(function(){player.ready=true;},250)
    }
}

function start(){
    
    addClass(startBtn,"hide");
    if(!player.inplay){
        gameArea.innerHTML="";
        player.inplay=true;
        player.ready=true;
        player.score=2000;
        player.activeBomb=0;
        player.bombScore=0;
        player.totalBombs=5;
        player.level=5;
        makeEnemy();
        player.plane=document.createElement("div");
        player.plane.setAttribute("class","plane");
        gameArea.appendChild(player.plane);
        
        player.x=player.plane.offsetLeft;
        player.y=player.plane.offsetTop;
    
        window.requestAnimationFrame(playGame);
    }


}

function endGame(){
    console.log("GameOver");
    player.inplay=false;
    startBtn.classList.remove("hide");
}

function isCollide(a,b){
    let aRect=a.getBoundingClientRect();
    let bRect=b.getBoundingClientRect();
    return !((aRect.bottom <bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
}

function remove_element(parent,child){
    parent.removeChild(child);
}

function  moveBomb(){
    let bombs=document.querySelectorAll(".bomb");
    bombs.forEach(function(item){
        item.y+=player.speed*2;
        item.style.top=item.y+"px";
        if(item.y>1000){
            player.activeBomb--;
            remove_element(item.parentElement,item);

        }
        if(isCollide(item,player.base)){
            // console.log("crash");
            player.score+=2000;
            remove_element(player.base.parentElement,player.base);
            remove_element(item.parentElement,item);
            makeEnemy();
        }
    })
}

function playGame(){
    
    if(player.inplay){
        moveBomb();
        if(keys.space){
            makeBomb();
        }
        if(keys.ArrowUp){
            player.y-=player.speed;

        }
        if(keys.ArrowDown){
            player.y+=player.speed;
        }
        if(keys.ArrowLeft && player.x > 0){
            player.x-=player.speed;

        }
        if(keys.ArrowRight && player.x<gameArea.offsetWidth){
            player.x+=player.speed;
        }

        player.x+=(player.speed*2);
        if(player.x>Math.min(gameArea.offsetWidth+200,window.innerWidth)){
            player.x=0;
            player.score-=100;
        }
        player.score--;
        if(player.score<0){
            player.score=0;
        }
        player.plane.style.left=player.x+"px";
        player.plane.style.top=player.y+"px";
        window.requestAnimationFrame(playGame);
        score.innerHTML="Score : "+player.score;
    }
}



function makeEnemy(){
    player.level--;
    if(player.level>=0){
        player.base=document.createElement("div");
        player.base.setAttribute("class","base");
    
        player.base.style.width=range(10,200)+"px";
        player.base.style.height=range(100,100)+"px";
        player.base.style.left=range(100,gameArea.offsetWidth)+"px";
    
        gameArea.appendChild(player.base);
    }
    else{
        endGame();
    }

}