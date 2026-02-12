(function(){
    'use strict';
    console.log('reading js');

    const sections = document.querySelectorAll('section');
    const main = document.querySelector('main');
  
    document.querySelector('#play').addEventListener('click', function(){
       
        main.className = "showing";
        sections[0].className = "moveUp";
        sections[1].className = "showing";
    });

    document.querySelector('#again').addEventListener('click', function(){

        sections.forEach(section => {
            section.className = "hidden";
        })
        sections[1].className = "showing";
        
    });

    let rotation = 0;

    function rotate(degrees = 90){
        rotation += degrees;
        
        const spinny = document.querySelector('#lazySusan');
        spinny.style.transform =   `translate(-50%,0) rotate(${rotation}deg)`;
    }

    const madLib = document.querySelector('#receipt');
    const formTag = document.querySelectorAll('form');

    formTag.forEach((form, index) => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            rotate(90);

            // sections[index + 1].className = "moveUp";
            // sections[index + 2].className = "showing";

            sections[index + 1].classList.add('moveUp');
            sections[index + 2].classList.remove('hidden');
            sections[index + 2].classList.add('showing');

            
            if (index === formTag.length - 1) {

                main.className = "hidden";

                const animal = document.querySelector('#animal').value;
                const feeling = document.querySelector('#negativeFeeling').value;
                const adj1 = document.querySelector('#adjective1').value;

                const large = document.querySelector('#largeNumber').value;
                const adj2 = document.querySelector('#adjective2').value;
                const food = document.querySelector('#food').value;

                const verb = document.querySelector('#aggressive').value;
                const noun = document.querySelector('#noun').value;
                const specific = document.querySelector('#specific').value;
                const name = document.querySelector('#name').value;

                madLib.innerHTML = 

                `<p>Dear staff of Golden <span>${animal}</span>,</p>
        
                <p>I am truly <span>${feeling}</span> for the incident today. I understand that your <span>${adj1}</span> establishment can’t take more than <span>${large}</span> orders at a time, but I was feeling really <span>${adj2}</span>. The <span>${food}</span> really <span>${verb}</span> through me.</p>

                <p>I did not mean to cause the <span>${noun}</span> in the bathroom. Please take this <span>$${specific}</span>, it’s all I had.</p>

                <p>Sincerely,</p>
                <p><span>${name}</span></p>`;
            }

        })
    })

}) ();