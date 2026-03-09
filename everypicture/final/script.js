(function(){

'use strict';
console.log('running js');


setTimeout(function(){
    document.querySelector('#center').classList.add('is-visible');
}, 3000);

setTimeout(function(){
    document.querySelector('#corners').classList.add('is-visible');
}, 3500);

setTimeout(function(){
    document.querySelector('main').classList.add('is-visible');
}, 3000);


const openBtns = document.querySelectorAll('img');
const closeBtns = document.querySelectorAll('.close');


for(let i=0; i<openBtns.length; i++){
    openBtns[i].addEventListener('click', function(event){
        event.preventDefault();
        const thisBtn = event.target.id;
        document.querySelector(`#ol-${thisBtn}`).className = 'overlay showing';

        openBtns[i].classList.add('paused');
    });
}


for(let i=0; i<closeBtns.length; i++){
    closeBtns[i].addEventListener('click', function(event){
        event.preventDefault();
        const overlay = event.target.closest('.overlay');
        
        overlay.className = 'overlay hidden';
        openBtns[i].classList.remove('paused');
    });
}

const car = document.querySelector('#1')

car.addEventListener('mousedown', function(){
    car.src = 'images/carY.png';
})
})();