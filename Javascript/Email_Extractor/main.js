let rawtxt=document.querySelector('.txt-top textarea[name=raw-txt]');
let protxt=document.querySelector('.txt-bottom textarea[name=processed-txt]')
let submitBtn=document.querySelector('.submit-btn')
let res=document.querySelector('.result');
console.log(rawtxt);
console.log(protxt);
function process_txt(txt){
    let exp=/([A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z0-9._-]+)/gi;
    let cleanData=txt.match(exp);
    cleanData.sort();
    console.log(cleanData);
    let i=0,n=cleanData.length;
    let curr_data="";
    let processedData=[];
    while(i<n){
        curr_data=cleanData[i];
        while(i<n&&cleanData[i]==curr_data){
            i++;
        }
        processedData.push(curr_data);
    }
    console.log(processedData);
    res.innerHTML="No.of valid emails found :"+processedData.length;
    return processedData;
}

submitBtn.addEventListener('click',function(){
    // console.log(rawtxt.innerHTML);
    protxt.value=process_txt(rawtxt.value);
    // res.innerHTML=protxt.value.length;


});



/*
ayush@gmail.com
ayush@gmail.com

*/
