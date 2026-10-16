'use strict';
const params = new URLSearchParams(location.search);
const guest = (params.get('guest') || '').trim().slice(0,200) || 'Our honoured guest';
const role = (params.get('title') || '').trim().slice(0,250);
document.querySelectorAll('.guest').forEach(el => el.textContent = guest);
document.getElementById('guest-role').textContent = role;
document.getElementById('open').addEventListener('click',()=>{document.body.classList.add('opened');document.getElementById('invitation').focus({preventScroll:true});document.getElementById('invitation').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
let page=1;const previous=document.getElementById('prev'), next=document.getElementById('next');
function showPage(){const src=`assets/biography-${page}.jpg`;document.getElementById('bio-image').src=src;document.getElementById('bio-image').alt=`RARA biography page ${page} in Khmer`;document.getElementById('bio-image-link').href=src;document.getElementById('page-count').textContent=`Page ${page} of 8`;previous.disabled=page===1;next.disabled=page===8;}
previous.addEventListener('click',()=>{if(page>1){page--;showPage();}});next.addEventListener('click',()=>{if(page<8){page++;showPage();}});showPage();
document.getElementById('print').addEventListener('click',()=>window.print());
const music=document.getElementById('background-music'), musicToggle=document.getElementById('music-toggle');
music.volume=0.35;
function updateMusic(){const playing=!music.paused;musicToggle.setAttribute('aria-pressed',String(playing));musicToggle.setAttribute('aria-label',playing?'Pause background music':'Play background music');musicToggle.querySelector('span').textContent=playing?'Music on':'Music off';}
async function playMusic(){try{await music.play();}catch{musicToggle.querySelector('span').textContent='Tap to play';}updateMusic();}
document.getElementById('open').addEventListener('click',()=>{if(music.paused)playMusic();});
musicToggle.addEventListener('click',()=>{if(music.paused)playMusic();else music.pause();});
music.addEventListener('play',updateMusic);music.addEventListener('pause',updateMusic);
music.addEventListener('error',()=>{musicToggle.querySelector('span').textContent='Music unavailable';musicToggle.disabled=true;});
