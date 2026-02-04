(function(){
    'use strict';
    console.log('reading js');

    const sections = document.querySelectorAll('section');
    const main = document.querySelectorAll('main');

    document.querySelector('#play').addEventListener('click', function(){
        sections[0].className = "moveUp";
        main.className = "showing";
        sections[1].className = "showing";
    });

    document.querySelector('#next1').addEventListener('click', function(){
        sections[1].className = "moveUp";
        sections[2].className = "showing";
    });

    document.querySelector('#next2').addEventListener('click', function(){
        sections[2].className = "moveUp";
        sections[3].className = "showing";
    });

    document.querySelector('#next3').addEventListener('submit', function(){
        sections[3].className = "moveUp";
        sections[4].className = "showing";
    });

    document.querySelector('#again').addEventListener('submit', function(){
        sections[4].className = "moveUp";
        sections[1].className = "showing";
    });



    const formTag = document.querySelector('form');
    const madLib = document.querySelector('#receipt');

    formTag.addEventListener('submit', function(event){
        event.preventDefault();

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

        let myText = 
     
        `<p>Dear staff of Golden ${animal},</p>
        
        <p>I am truly <span>${feeling}</span> for the incident today. I understand that your <span>${adj1}</span> establishment can’t take more than <span>${large}</span> orders at a time, but I was feeling really <span>${adj2}</span>. The <span>${food}</span> really <span>${verb}</span> through me.</p>

        <p>I did not mean to cause the <span>${noun}</span> in the bathroom. Please take this <span>${specific}</span>, it’s all I had.</p>

        <p>Sincerely,</p>
        <p><span>${name}</span></p>`;

        madLib.innerHTML = myText;
    });

}) ();