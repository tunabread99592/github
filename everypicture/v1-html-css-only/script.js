(function(){

'use strict';
console.log('running js');


// const button = document.querySelectorAll('button');
// const img = document.querySelectorAll('img');


// attempted and worked! But only for one device-------------------------

// const carImage = document.querySelector('#car');
// const popUp = document.querySelector('#overlay');

// carImage.addEventListener('click', function(event){
//     event.preventDefault();
//     popUp.classList.remove('hidden');
//     popUp.classList.add('showing');

//     carImage.classList.toggle('paused');
// });

// document.querySelector('.close').addEventListener('click', function(event){
//     event.preventDefault();
//     popUp.classList.remove('showing');
//     popUp.classList.add('hidden');

//     carImage.classList.toggle('paused');
// });

// document.addEventListener('keydown', function (event){
//     if (event.key === 'Escape') {
//         popUp.classList.remove('showing');
//         popUp.classList.add('hidden');

//         carImage.classList.toggle('paused');
//     }
//     });


const openBtns = document.querySelectorAll('img');
const closeBtns = document.querySelectorAll('.close');

for(let i=0; i<openBtns.length; i++){
    openBtns[i].addEventListener('click', function(event){
        event.preventDefault();
        const thisBtn = event.target.id;
        document.querySelector(`#ol-${thisBtn}`).className = 'overlay showing';

        openBtns[i].classList.toggle('paused');
    })
}

for(let i=0; i<closeBtns.length; i++){
    closeBtns[i].addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector('.overlay showing').className = 'overlay hidden';
    })
}

})();