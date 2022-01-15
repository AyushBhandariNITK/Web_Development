const msg=document.querySelector(".message");
const startTestBtn=document.querySelector(".start");
const typeText=document.querySelector('.typing-text');
const result_div=document.querySelector('.result');
let startTime,endTime;
let msgWords;
let words1="eat letter follow until for father car city red few ,feet land his once her watch important want white plant light than between follow study with our both they cut large oil read important answer eat could get important great city oil where found black sun state left begin boy right different through part mile part would fall we river their stop him eye again over side enough air tell right good at out number use now can as what me home earth show list this our had first large";
let words2="song one song call why got use sea but must way run the find another change answer know can use so water house watch something left way very him end set best study night form let follow he mile right got letter line house three made through war eye who such best from begin how grow country group year family let with those eat until what little animal old been she best life think also down our each name no might run water light sun call no family your begin";

/* 
    To disable the writing on textArea when Done
    element_name=disable=true;
*/

startTestBtn.addEventListener("click",function(){
    console.log(this.innerText)

    if(this.innerText=="Start"){
        typeText.disabled=false;  
        result_div.classList.add('hide');  
        playGame();
    }
    else if(this.innerText=="Done"){
        // console.log(typeText.value);
        typeText.disabled=true;
        startTestBtn.innerText="Start";
        endPlay();
    }
    // console.log(getRandomString(50)); 
});

function playGame() {
    let result="",randomINT;
    msg.innerHTML = '';
    w1=words1.split(" ");
    w2=words2.split(" ");
    for(let i=0;i<50;i++){
        if(i%2){
            randomINT=Math.floor(Math.random()*w1.length);
            result+=w1[randomINT];
        }
        else{
            randomINT=Math.floor(Math.random()*w2.length);
            result+=w2[randomINT];
        }
        result+=" ";
    }

    typeText.innerText='';
    msg.innerText=result;
    let date=new Date();
    startTime=date.getTime();
    console.log(startTime);
    startTestBtn.innerText="Done";
}

function countWords(str){
    let words=str.split(' ');
    console.log(words);
    return words;
}

function endPlay() {
    console.log("end");
    let date=new Date();
    endTime=date.getTime();
    let totalTime=(endTime-startTime)/1000;
    console.log(totalTime);
    let str1=typeText.value,str2=msg.innerText;
    console.log(str1);
    console.log(str2);
    let typedWords=countWords(str1);
    let msgWords=countWords(str2);

    console.log(typedWords);
    console.log(msgWords);

    console.log(typedWords.length+":"+msgWords.length);  
    let result_data=getAcurracy(msgWords,typedWords);
    let wpm=(((result_data.correct)/4.7)/totalTime)*60;
    let accuracy=result_data.accuracy;
    displayResult(wpm,accuracy,totalTime);
    
}

function displayResult(a,b,c) {
    a=a.toFixed(2);
    b=b.toFixed(2);
    c=c.toFixed(2);
    if(isNaN(b))
        b=0;
    console.log(a+":"+b+":"+c);
    let wpm=document.querySelector('#wpm');
    let time=document.querySelector('#total-time');
    let accuracy=document.querySelector('#accuracy'); 
    wpm.innerText="Speed (wpm) : "+a;
    accuracy.innerText="Accuracy : "+b;
    time.innerText="Time taken (s) : " +c;
    result_div.classList.remove('hide');
}

function getAcurracy(a,b){
    let i=0;
    let n=b.length;
    let total_words=0;
    let res={
        accuracy:0,
        correct:0
    };
    console.log(n);
    while(i<n){
        w1=a[i];
        w2=b[i];
        console.log(w1+":"+w2);
        let run=Math.min(w1.length,w2.length);
        let j=0;
        while(j<run){
            if(w1[j]==w2[j])
                res.correct++;
            j++;
        }
        total_words+=w2.length;
        i++;
    }
    console.log(res.correct);
    console.log(total_words);
    console.log((res.correct/total_words)*100);
    res.accuracy=(res.correct/total_words)*100;
    console.log(res);

    return res;
}




