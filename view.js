const flechaEl = document.querySelector('.flecha');
const menuEl = document.getElementById('menu')
const i = document.querySelector('.flecha i');

const pause = document.querySelector('.controls .pause');
const snap = document.querySelector('.controls .snap');

flechaEl.addEventListener('click',()=>{
    console.log(i,i.classList[1])
    if(i.classList[1] === 'fa-angle-double-up'){
        i.classList.remove('fa-angle-double-up');
        i.classList.add('fa-angle-double-down');
        menuEl.style.height="4.5rem";        
    }else{
        i.classList.remove('fa-angle-double-down');
        i.classList.add('fa-angle-double-up')
        menuEl.style.height="auto";    
    }
});

pause.addEventListener('click',(e)=>{
    if((pause.children[0].classList[1]==='fa-pause')){
        noLoop();
        pause.children[0].classList.remove('fa-pause');
        pause.children[0].classList.add('fa-play');
    }else{
        loop();
        pause.children[0].classList.add('fa-pause');
        pause.children[0].classList.remove('fa-play');
    }
})

snap.addEventListener('click',(e)=>{
    saveCanvas('flowfile','png');
})