const flechaEl = document.querySelector('.flecha');
const menuEl = document.getElementById('menu')
const i = document.querySelector('.flecha i');

const pause = document.querySelector('.controls .pause');
const snap = document.querySelector('.controls .snap');

const backgroundHeader = document.querySelector('.background-header');
const backgroundContent = document.querySelector('.background-content');
const colorListEl = document.querySelectorAll('.background-content div'); 


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

backgroundHeader.addEventListener('click',(e)=>{
    let display = backgroundContent.style.display;
    if(display === 'none'){
        backgroundHeader.children[1].classList.remove('fa-angle-down');
        backgroundHeader.children[1].classList.add('fa-angle-up');
        backgroundContent.style.display= 'flex';        
    }else{
        backgroundContent.style.display= 'none';
        backgroundHeader.children[1].classList.add('fa-angle-down');
        backgroundHeader.children[1].classList.remove('fa-angle-up');
    }
});

colorListEl.forEach(element =>{
    element.addEventListener('click',(e)=>{
        points = []
        backgroundcolor = element.textContent;
        setup()
        background(backgroundcolor);
    })
})