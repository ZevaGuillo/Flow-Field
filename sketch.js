const inputDensity = document.getElementById('Density');
const inputStrokeWeight = document.getElementById('StrokeWeight');
const inputAngle = document.getElementById('Angle');
const inputColor = document.getElementById('inputColor');
const inputNoiseDetail = document.getElementById('noiseDetail');
const inputAngleMode = document.getElementById('angle-mode');

let density = 50;

let angleValue = 10;

let StrokeWeight = 3;

let noiseDetailI = 1;

//let angleModeI = RADIANS o DEGREES 

//let angleModeI = (inputAngleMode.value === "Radians")?RADIANS:DEGREES;

inputAngleMode.addEventListener('change', (e)=>{
  points = []
  console.log(inputAngleMode.value)
  if (inputAngleMode.value === "Radians"){
    angleMode(RADIANS);
  }else{
    angleMode(DEGREES);
  }
  
  setup()
})

inputNoiseDetail.addEventListener('input',(e)=>{
  points = []
  noiseDetailI =  map(parseInt(inputNoiseDetail.value),0,100,1,7);
  setup()
})

inputDensity.addEventListener('input',(e)=>{
  points = []
  density =  map(parseInt(inputDensity.value),0,100,40,80);
  setup()
})

inputAngle.addEventListener('input',(e)=>{
  points = []
  angleValue = inputAngle.value;
  setup()
})

inputStrokeWeight.addEventListener('input',(e)=>{
  points = []
  StrokeWeight = map(inputStrokeWeight.value,0,100,0.5,3);
  setup()
})

let points = [];
let mult, space;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background(30);
  noiseDetail(noiseDetailI);
  
  
  space = width / density;
  
  for(let x=0; x < width; x += space){
    for(let y = 0; y < height; y += space){
      
      let p = createVector(x + random(-10,10), y + random(-10,10));
      points.push(p);
      
    }
  }
  
  shuffle(points, true);
  
  mult = random(0.01, 0.02)
}

function draw() {
  noStroke();
  for(let i in points){
    
    let inColorR = color(inputColor.value).levels[0]
    let inColorG = color(inputColor.value).levels[1]
    let inColorB = color(inputColor.value).levels[2]

    let auxRandomColor = colorGenerate([inColorR,inColorG,inColorB]);

    let r = auxRandomColor[0]
    let g = auxRandomColor[1]
    let b = auxRandomColor[2]
    let alpha = map(dist(width /2, height / 2, points[i].x,points[i].y), 0, windowWidth/2, 200, 0);
    
    fill(r,g,b, alpha);

    let mapAngleValue = map(angleValue,0,100,200,1000);
    
    let angle = map(noise(points[i].x * mult, points[i].y * mult) * PI, 0, 2, 0, mapAngleValue);
    
    
    
    points[i].add(createVector(cos(angle), sin(angle)))
    
    
    ellipse(points[i].x, points[i].y, StrokeWeight);
  }
  
} 

function mouseCliked(){
  saveCanvas('flowfile','png')
}


function randomPos(pos){
  pos = createVector(pos.x + random(-10,10), pos.y + random(-10,10))

}

function resetSketch() {
  let space = width / density;
  
  for(let x=0; x < width; x += space){
    for(let y = 0; y < height; y += space){
      
      points.forEach(pos=>createVector(x + random(-10,10), y + random(-10,10)))       
      
    }
  }
}

function windowResized() {
  points = []
  setup();
  resizeCanvas(windowWidth, windowHeight);
  background(30);
}

function colorGenerate(color = [random(0,255),random(0,255), random(0,255)]){
  let rgb = color;
  
  let rMax = color[0];
  let gMax = color[1];
  let bMax = color[2];
  let rMin, gMin, bMin;

  let i = 120; 

  if(rMax >= i && gMax >= i && bMax >= i){
    rMin = rMax - i;
    gMin = gMax - i;
    bMin = bMax - i;  
  }else{
    rMin = rMax + i;
    gMin = gMax + i;
    bMin = bMax + i;
  }
  rgb = [random(rMin,rMax),random(gMin,gMax), random(bMin,bMax)];
  return rgb;

}
