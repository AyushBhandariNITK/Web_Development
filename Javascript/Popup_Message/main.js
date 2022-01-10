let popupBtn=document.querySelector('.popup');
let msg=document.querySelector('.msg-box');
let closeBtn=document.querySelector('.close-btn');
let overlay=document.getElementById('overlay');

popupBtn.addEventListener('click',function(){
    openmsg(msg);
});

closeBtn.addEventListener('click',function(){
    closemsg(msg);
});

function openmsg(msg){
    if(msg==null)   return ;
    msg.classList.add('active');
    overlay.classList.add('active');
}

function closemsg(msg){
    if(msg==null)   return ;
    msg.classList.remove('active');
    overlay.classList.remove('active');
}

