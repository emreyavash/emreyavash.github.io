/* ******************🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥****************** */


 

const divSlider = document.querySelector('.sliderDiv');
const slider=document.querySelectorAll('.sliderDiv img');
// Buttons
const next=document.querySelector('#nextBtn');
const prev=document.querySelector('#prevBtn');

// Counters
let counter=1;
const size =slider[0].clientWidth;


divSlider.style.transform='translateX('+(-size * counter)+'px)';


//Button Listeners
next.addEventListener('click',()=>{
   if(counter>=slider.length-1) return ;
   divSlider.style.transition='transform 0.4s ease-in-out'; 
   counter++;
   divSlider.style.transform='translateX('+(-size*counter)+'px)';
});

prev.addEventListener('click',()=>{
    if(counter<=0) return;
   divSlider.style.transition='transform 0.4s ease-in-out'; 
   counter--;
   divSlider.style.transform='translateX('+(-size*counter)+'px)';
   
    
    
});

divSlider.addEventListener('transitionend',()=>{
    if(slider[counter].id==='lastClone'){
   divSlider.style.transition='none';
   counter=slider.length - 2;
   divSlider.style.transform='translateX('+(-size*counter)+'px)';

    }
   if(slider[counter].id==='firstClone'){
        divSlider.style.transition='none';
        counter=slider.length - counter ;
        divSlider.style.transform='translateX('+(-size*counter)+'px)';
 
 }
});