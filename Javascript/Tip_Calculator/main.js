
let slide=document.querySelectorAll("input[type='range']");
slide.forEach(function(x){
    x.addEventListener('input',calculatebill);
});


let billInput=document.getElementById('bill');
billInput.addEventListener("change",calculatebill);


function calculatebill(){

    let initial_cost=parseFloat(billInput.value);
    let tip=document.getElementById('tip').value;
    let no_of_person=document.getElementById('person').value;
    //   console.log(tip);

    let total_tip=parseFloat(((initial_cost*tip)/100).toFixed(2));
    let tip_per_person=parseFloat((total_tip/no_of_person).toFixed(2));
    let total_cost=parseFloat((initial_cost+total_tip).toFixed(2));
    let total_per_person=parseFloat((total_cost/no_of_person).toFixed(2));
  
    // console.log(total_tip);
    // console.log(initial_cost+total_tip);
    // console.log(tip_per_person);
    // console.log(total_per_person);


    document.getElementById('tip-amt').innerHTML=`$ ${total_tip}`;
    document.getElementById('total-amt').innerHTML=`$ ${total_cost}`;
    document.getElementById('tip-val').innerHTML=`${tip}%`;
    document.getElementById('person-val').innerHTML=`${no_of_person}`;
    document.getElementById('tip-per-person').innerHTML=`$ ${tip_per_person}`;
    document.getElementById('total-per-person').innerHTML=`$ ${total_per_person}`;

}

calculatebill();
