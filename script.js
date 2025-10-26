// ===== Star Background =====
const canvas=document.getElementById("bg-stars");
const ctx=canvas.getContext("2d");
let stars=[],w,h;
function resize(){
  w=canvas.width=innerWidth;
  h=canvas.height=innerHeight;
  stars=Array.from({length:180},()=>({
    x:Math.random()*w,y:Math.random()*h,
    r:Math.random()*1.2,
    a:Math.random(),
    tail:Math.random()<0.05
  }));
}
function animateStars(){
  ctx.clearRect(0,0,w,h);
  for(const s of stars){
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,128,179,${s.a})`;
    ctx.fill();
    if(s.tail){
      ctx.beginPath();
      ctx.moveTo(s.x,s.y);
      ctx.lineTo(s.x-5,s.y+5);
      ctx.strokeStyle=`rgba(255,128,179,${s.a/2})`;
      ctx.stroke();
    }
    s.a+=(Math.random()-0.5)*0.03;
    s.a=Math.max(0,Math.min(1,s.a));
  }
  requestAnimationFrame(animateStars);
}
resize();
animateStars();
addEventListener("resize",resize);

// ===== Cursor & Sparkle =====
const cursor=document.querySelector(".cursor");
document.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
  const s=document.createElement("div");
  s.className="sparkle";
  s.style.left=e.clientX+"px";
  s.style.top=e.clientY+"px";
  document.body.appendChild(s);
  s.addEventListener("animationend",()=>s.remove());
});
document.body.style.cursor="none";

// ===== Scroll Top Button =====
const scrollBtn=document.getElementById("scrollTopBtn");
window.onscroll=()=>{
  scrollBtn.style.display=window.scrollY>300?"block":"none";
}
scrollBtn.onclick=()=>window.scrollTo({top:0,behavior:"smooth"});

// ===== Skills Comet Animation =====
const skillStars=document.querySelectorAll(".skill-star");
skillStars.forEach(star=>{
  let x=Math.random()*window.innerWidth;
  let y=Math.random()*window.innerHeight;
  let dx=(Math.random()-0.5)*0.6;
  let dy=(Math.random()-0.5)*0.6;
  function move(){
    x+=dx; y+=dy;
    if(x<0||x>window.innerWidth) dx*=-1;
    if(y<0||y>window.innerHeight) dy*=-1;
    star.style.transform=`translate(${x}px,${y}px)`;
    requestAnimationFrame(move);
  }
  move();
});

// ===== About Popup =====
const btn=document.getElementById("readMoreBtn");
const popup=document.getElementById("aboutPopup");
const closeBtn=document.getElementById("closePopup");
const closePopupBtn=document.getElementById("closePopupBtn");
btn.onclick=()=>popup.classList.add("active");
closeBtn.onclick=()=>popup.classList.remove("active");
closePopupBtn.onclick=()=>popup.classList.remove("active");

// ===== Popup Spark Animation =====
const sparkCanvas=document.getElementById("sparkCanvas");
const scx=sparkCanvas.getContext("2d");
let sparks=[];
function sparkResize(){
  sparkCanvas.width=popup.clientWidth;
  sparkCanvas.height=popup.clientHeight;
}
function drawSparks(){
  scx.clearRect(0,0,sparkCanvas.width,sparkCanvas.height);
  for(let s of sparks){
    scx.beginPath();
    scx.arc(s.x,s.y,s.r,0,Math.PI*2);
    scx.fillStyle=`rgba(255,128,179,${s.a})`;
    scx.fill();
    s.y-=0.5; s.a-=0.01;
  }
  sparks=sparks.filter(s=>s.a>0);
  if(Math.random()<0.2) sparks.push({x:Math.random()*sparkCanvas.width,y:sparkCanvas.height,r:Math.random()*3+1,a:1});
  requestAnimationFrame(drawSparks);
}
sparkResize();
drawSparks();
addEventListener("resize",sparkResize);
