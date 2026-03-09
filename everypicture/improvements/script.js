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


openBtns.forEach(function(img){
    const originalSrc = img.src;
    const yellowSrc = originalSrc.replace('.png', 'Y.png');

    img.addEventListener('mousedown', function(){
        this.src = yellowSrc;
    });

    img.addEventListener('mouseup', function(){
        this.src = originalSrc;
    });

    img.addEventListener('mouseleave', function(){
        this.src = originalSrc;
    });
});

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

const star = document.querySelector('#star');
const originalText = document.querySelector('#star p')

star.addEventListener('mouseover', function(){
    originalText.innerHTML = ('<p>Wedged in my bones</p>');
})

star.addEventListener('mouseout', function(){
    originalText.innerHTML = ('<p>Click on the goop</p>')
})


})();