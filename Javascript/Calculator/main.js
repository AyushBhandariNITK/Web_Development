
let numList=document.querySelectorAll('.number');
let opList=document.querySelectorAll('.operation');
let clear_entry=document.querySelector('.clear-entry');
let clear_all=document.querySelector('.clear-all');
let dot=document.querySelector('.dot');
let equal=document.querySelector('.equal');
let sign=document.querySelector('.sign');
let display_1=document.querySelector('.display-1');
let display_2=document.querySelector('.display-2');
let s1="";
let s2="";
let haveDot=false;

function precision(s,x){
    s=String(s);
    x=Number(x);
    let new_str="";
    let cnt=0;
    let have_decimal=false;
    for(let i=0;i<s.length;i++){
        new_str+=s[i];
        if(s[i]=='.'){
            have_decimal=true;
            continue;
        }
        if(have_decimal)
            cnt++;
        if(cnt==x)
            break;
    }
    console.log(new_str);
    return new_str;
}

function update_node(x,y){
    x.innerText=y;
}

clear_all.addEventListener('click',function(){
    s1="";
    s2="";
    update_node(display_2,s2)
    update_node(display_1,s1);
});

clear_entry.addEventListener('click',function(){
    if(s2){
        s2=s2.substring(0,s2.length-1);
        update_node(display_2,s2);
    }
});

equal.addEventListener('click',function(){
    if(s2){
        let s1_len=s1.length;
        if(s1[s1_len-1]=='-'&&s2[0]=='-'){
            s1=s1.substring(0,s1_len-1);
            s1+='+';
            s2=s2.substring(1,s2.length);
            console.log(s1+":"+s2);
        }
        s1+=s2;
        s2=precision(eval(s1),2);
        s1="";
        update_node(display_1,s1);
        update_node(display_2,s2);
    }
    else
        alert("Not able to perform operation!"+"\n"+"Two numbers are required to perform operation");
});

sign.addEventListener('click',function(){
    s2='-'+s2;
    update_node(display_2,s2);
});

dot.addEventListener('click',function(){
    if(!haveDot){
        haveDot=true;
        s2+=".";
        update_node(display_2,s2);
        return;
    }
    alert("Number can't have two decimals !");
});

numList.forEach( (num)=>{
    num.addEventListener('click',(e)=>{
        s2+=e.target.innerText;
        update_node(display_2,s2);
    });
});

opList.forEach( (op) =>{
    op.addEventListener('click',(e)=>{
        haveDot=false;
        if((s1[s1.length-1]=='+')||(s1[s1.length-1]=='-')||(s1[s1.length-1]=='*')||(s1[s1.length-1]=='/'))
            s1=s1.substring(0,s1.length-1);
        if(s2||s1){
            s1+=s2;
            s1+=e.target.innerText;
            s2="";
            update_node(display_1,s1);
            update_node(display_2,s2);
        }
        else
            alert("Not able to perform operation!"+"\n"+"Two numbers are required to perform operation");

    });
});


