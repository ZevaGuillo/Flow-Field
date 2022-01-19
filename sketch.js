const inputDensity = document.getElementById('Density');
const inputStrokeWeight = document.getElementById('StrokeWeight');
const inputAngle = document.getElementById('Angle');
const inputColor = document.getElementById('inputColor');

let density = 50;

let angleValue = 10;

let StrokeWeight = 3;

inputDensity.addEventListener('input',(e)=>{
  points = []
  density =  map(parseInt(inputDensity.value),0,100,10,90);
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
  angleMode(DEGREES);
  noiseDetail(1);
  
  
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
    
    let r = map(points[i].x, 0, width, 50, 255);
    let g = map(points[i].y, 0, height, 50, 255);
    let b = map(points[i].x, 0, width, 255, 50);
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
