// STAR CURSOR
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e=>{
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  createSparkle(e.clientX,e.clientY);
});
function createSparkle(x,y){
  const sparkle = document.createElement('div');
  sparkle.classList.add('cursor-sparkle');
  sparkle.style.left = x+'px';
  sparkle.style.top = y+'px';
  document.body.appendChild(sparkle);
  sparkle.addEventListener('animationend', ()=> sparkle.remove());
}

// STARFIELD BACKGROUND
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars=[];
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

function initStars(){
  stars=[];
  for(let i=0;i<150;i++){
    stars.push({x:Math.random()*w, y:Math.random()*h, radius:Math.random()*1.2, alpha:Math.random()});
  }
}
function drawStars(){
  ctx.clearRect(0,0,w,h);
  stars.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,182,193,${s.alpha})`;
    ctx.fill();
    s.alpha += (Math.random()-0.5)*0.05;
    if(s.alpha<0) s.alpha=0;
    if(s.alpha>1) s.alpha=1;
  });
  requestAnimationFrame(drawStars);
}
window.addEventListener('resize', ()=>{
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  initStars();
});
initStars();
drawStars();

// ABOUT POP-UP
const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      aboutSection.classList.add('active');
    }
  });
},{threshold:0.3});
observer.observe(aboutSection);
