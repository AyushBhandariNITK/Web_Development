const rollBtn=document.querySelector('.roll');
const player1=document.querySelector('.player1');
const player2=document.querySelector('.player2');
const output=document.querySelector('.output');


const dice=[[5],[1,9],[1,5,9],[1,3,7,9],[1,3,5,7,9],[1,3,4,6,7,9]]
rollBtn.addEventListener("click",function(){
    console.log("work");
    let rolls=[rollDice(1,6),rollDice(1,6)];
    let res="";
    if(rolls[0]==rolls[1]){
        res="Draw";
    }
    else if(rolls[0]>rolls[1]){
        res="Player 1 Wins";
    }
    else {
        res="Player 2 Wins";
    }
    updateElement(player1,rolls[0]);
    updateElement(player2,rolls[1]);
    output.innerHTML=res;
    console.log(rolls);
})

function updateElement(elem,val){
    let holder=builder(val);
    if(elem.children[1])
        elem.children[1].remove();
    elem.append(holder); 
}

function builder(num) {
    let div=document.createElement("div");
    let dieArray=dice[num-1];
    div.setAttribute("class","dicer");
    for(let x=1;x<10;x++){
        let new_div=document.createElement("div");
        new_div.setAttribute("class","dot");
        if(dieArray.includes(x))
            new_div.classList.add("black");
        div.appendChild(new_div);
    }
    console.log(num+":"+dieArray);
    return div;
}

/* rollDice (a,b) => [a,b] */
function rollDice(a,b) {
    let num=a+ Math.floor((b-a+1)*Math.random());
    return num;
}
