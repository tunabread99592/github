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
}, 4000);


const openBtns = document.querySelectorAll('img');
const closeBtns = document.querySelectorAll('.close');


for(let i=0; i<openBtns.length; i++){
    openBtns[i].addEventListener('click', function(event){
        event.preventDefault();
        const thisBtn = event.target.id;
        document.querySelector(`#ol-${thisBtn}`).className = 'overlay showing';

        openBtns[i].classList.add('paused');

        // openBtns.forEach(function(img){
        //     img.disabled = true;
        // });
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

// document.addEventListener('keydown', function (event){
//     if (event.key === 'Escape') {
//         overlay.className = 'overlay hidden';
        
//         openBtns[i].classList.remove('paused');
//     }
//     });




// window.onload = function() {
//     let posX = Math.random() * (window.innerWidth - openBtns.clientWidth);
//     let posY = Math.random() * (window.innerHeight - openBtns.clientHeight);

//     let speedX = (Math.random() - 0.5) * 4;
//     let speedY = (Math.random() - 0.5) * 4;

//     function animate(){
//         posX += speedX;
//         posY += speedY;

//         if (posX + openBtns.clientWidth > window.innerWidth || posX < 0) {
//             speedX *= -1;
//             posX = Math.max(0, Math.min(window.innerWidth - openBtns.clientWidth, posX));
//         }

//         if (posY + openBtns.clientHeight > window.innerHeight || posY < 0) {
//             speedY *= -1;
//             posY = Math.max(0, Math.min(window.innerHeight - openBtns.clientHeight, posY));
//         }

//         openBtns.style.left = posX + 'px';
//         openBtns.style.top = posY + 'px';

//         requestAnimationFrame(animate);
//     }

//     requestAnimationFrame(animate);
// };



})();