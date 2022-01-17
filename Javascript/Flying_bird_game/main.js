const startBtn=document.querySelector('.startBtn');
const score=document.querySelector('.score');
const gameArea=document.querySelector('.gameArea');

document.addEventListener('keydown',pressOn);
document.addEventListener('keyup',pressOff);
startBtn.addEventListener("click",start);

console.log(gameArea.getBoundingClientRect());
let player={
    score:0,
    speed:2,
    inplay:false
}

let keys={
    space:false
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


function range(a,b){
    return Math.floor(Math.random()*(b-a))+a;
}


function isCollide(a,b){
    let aRect=a.getBoundingClientRect();
    let bRect=b.getBoundingClientRect();
    return !((aRect.bottom <bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
}


function start(){

    startBtn.classList.add("hide");
    // score.classList.remove("hide");
    if(!player.inplay){
        gameArea.innerHTML="";
    
        player.inplay=true;
        player.score=0;
        player.playGameCall=5;
        player.bird=document.createElement("div");
        player.bird.setAttribute("class","bird");
        gameArea.appendChild(player.bird);
        player.x=player.bird.offsetLeft;
        player.y=player.bird.offsetTop;

        player.pipe=0;
        let spacing=300;
        let howMany=Math.floor((gameArea.offsetWidth/spacing));
        for(let i=0;i<howMany;i++){
            buildPipes(player.pipe*spacing);   
        }
        // console.log(how_many);

        window.requestAnimationFrame(playGame);
    }
}

function buildPipes(startPos){
    let totalHeight=gameArea.offsetHeight;
    let totalWidth=gameArea.offsetWidth;
    let left=gameArea.offsetLeft;
    let top=gameArea.offsetTop;

    let bottom=Math.floor(window.innerHeight-(totalHeight+top));

    player.pipe++;
    let pipe1=document.createElement("div");
    pipe1.start=startPos+totalWidth+left;
    pipe1.setAttribute("class","pipe");
    pipe1.height=range(100,totalHeight/2);
    pipe1.style.height=pipe1.height+"px";
    pipe1.style.left=pipe1.start+"px";
    pipe1.style.top=top+"px";
    pipe1.x=pipe1.start;
    pipe1.id=player.pipe;
    pipe1.style.backgroundColor=getColor();
    gameArea.appendChild(pipe1);

    let spaceBetween=range(150,250);
    // console.log(spaceBetween);
    console.log("space:"+spaceBetween);
    let pipe2=document.createElement("div");
    pipe2.start=pipe1.start;
    pipe2.setAttribute("class","pipe");
    pipe2.height=totalHeight-pipe1.height-spaceBetween;
    pipe2.style.height=pipe2.height+"px";
    pipe2.style.left=pipe2.start+"px";
    pipe2.style.bottom=bottom+"px";
    pipe2.x=pipe2.start;
    pipe2.id=player.pipe;
    pipe2.style.backgroundColor=pipe1.style.backgroundColor;
    gameArea.appendChild(pipe2);

}


function getColor(){
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
    }

    let color= "#"+c()+c()+c();
    console.log(color);
    return color;
}

function movePipes(bird){
    let lines=document.querySelectorAll(".pipe");
    let counter=0;
    lines.forEach(function(item){
        item.x-=player.speed;
        item.style.left=item.x+"px";
        if(item.x<0){
            item.parentElement.removeChild(item);
            counter++;
        }
        if(isCollide(item,bird)){
            endGame();
        }
    });
    counter/=2;

    for(let i=0;i<counter;i++){
        buildPipes(0);
    }

}

function clearpipes(){
    let lines=document.querySelectorAll(".pipe");
    for(i=0;i<2;i++){
        lines[i].parentElement.removeChild(lines[i]);
    }; 
    buildPipes(0);  
}

function playGame(){
    if(player.inplay){
        // console.log(player.x+":"+player.y+" .... ");
        movePipes(player.bird);
        if(keys.space||keys.ArrowUp){
            player.y-=5*player.speed;
        }
        if(keys.ArrowLeft){
            player.x-=player.speed;
        }
        player.x+=player.speed;
        // console.log(player.x);
        player.y+=player.speed
        if(player.x>gameArea.offsetLeft+gameArea.offsetWidth-50){
            player.x=gameArea.offsetLeft;
            clearpipes();
            console.log("clearpipes");
        }

        if(player.y<gameArea.offsetTop)
            player.y=gameArea.offsetTop;
        if(player.y>gameArea.offsetTop+gameArea.offsetHeight-50){
            player.y=gameArea.offsetTop+gameArea.offsetHeight-50;
            endGame();
        }

        player.bird.style.left=player.x+"px";
        player.bird.style.top=player.y+"px";

        player.playGameCall++;
        if(player.playGameCall%5==0)
            player.score++;

        score.innerHTML="Score : "+player.score;
        window.requestAnimationFrame(playGame);
    }
}

function endGame(){

    console.log("GameOver");
    player.inplay=false;
    startBtn.classList.remove("hide");
    player.bird.setAttribute("style","transform:rotate(180deg");

    // bird.style.transform=rotate(180)+"deg";
}


