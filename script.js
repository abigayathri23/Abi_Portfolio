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

// ===== Scroll Top Button & Side Socials Visibility =====
const scrollBtn = document.getElementById("scrollTopBtn");
const sideSocials = document.querySelector(".side-socials");
const homeSection = document.querySelector(".home");
const header = document.querySelector("header");
let lastScrollTop = 0;

window.onscroll = () => {
  const scrollTop = window.scrollY;
  
  // Scroll button visibility
  scrollBtn.style.display = scrollTop > 300 ? "block" : "none";
  
  // Side socials visibility - only show in home section
  if (homeSection) {
    const homeBounds = homeSection.getBoundingClientRect();
    const isInHomeSection = homeBounds.bottom > 0;  // Show only when home section is visible
    sideSocials.classList.toggle("visible", isInHomeSection);
  }

  // Header behavior on scroll
  if (scrollTop === 0) {
    // At the top of the page - transparent header
    header.style.background = "transparent";
    header.style.boxShadow = "none";
  } else {
    // Not at the top - show background if header is visible
    //header.style.background = "rgba(0, 0, 0, 0.98)";
    //header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.2)";
  }

  // Hide/Show header based on scroll direction
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down & not at top - hide header
    header.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up or at top - show header
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
}
scrollBtn.onclick = () => window.scrollTo({top: 0, behavior: "smooth"});

window.dispatchEvent(new Event("scroll"));

// ===== Skill Random Floating Animation Control =====
// ===== Floating Skill Circles =====
const skills = document.querySelectorAll(".skill-circle");
const skillArea = document.querySelector(".skills-area");

skills.forEach(circle => {
  // random starting position
  const maxX = skillArea.offsetWidth - 80;
  const maxY = skillArea.offsetHeight - 80;
  let x = Math.random() * maxX;
  let y = Math.random() * maxY;

  // random small drift direction and speed
  let dx = (Math.random() - 0.5) * 0.8;
  let dy = (Math.random() - 0.5) * 0.8;

  function move() {
    x += dx;
    y += dy;

    // bounce inside skill area
    if (x <= 0 || x >= maxX) dx *= -1;
    if (y <= 0 || y >= maxY) dy *= -1;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

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
// ===== Auto Sliding Projects =====
const projectContainer = document.querySelector(".projects-container");
let currentIndex = 0;
let isScrolling = false;
let autoSlideInterval;

// Function to move to the next slide
function moveToNextSlide() {
  if (!projectContainer || projectContainer.children.length <= 3) return;
  
  currentIndex = (currentIndex + 1) % (projectContainer.children.length - 2);
  const cardWidth = projectContainer.children[0].offsetWidth + 24;
  const offset = currentIndex * cardWidth; // Changed from negative to positive for right direction
  
  projectContainer.style.transition = 'transform 0.8s ease';
  projectContainer.style.transform = `translateX(${offset}px)`;
  
  // Reset to beginning when reaching the end
  if (currentIndex === projectContainer.children.length - 3) {
    setTimeout(() => {
      projectContainer.style.transition = 'none';
      currentIndex = 0;
      projectContainer.style.transform = 'translateX(0)';
      setTimeout(() => {
        projectContainer.style.transition = 'transform 0.8s ease';
      }, 50);
    }, 800);
  }
}

// Start auto-sliding
function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(moveToNextSlide, 3000); // Slide every 3 seconds
}

// Pause auto-sliding on user interaction
function pauseAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    // Restart after 5 seconds of no interaction
    setTimeout(startAutoSlide, 5000);
  }
}

// Handle manual scroll
window.addEventListener("wheel", (e) => {
  if (isScrolling) return; // prevent rapid scrolling
  isScrolling = true;
  pauseAutoSlide();

  if (e.deltaY > 0) {
    // Scroll down → next set of projects
    currentIndex = Math.min(currentIndex + 1, projectContainer.children.length - 3);
  } else {
    // Scroll up → previous set of projects
    currentIndex = Math.max(currentIndex - 1, 0);
  }

  const cardWidth = projectContainer.children[0].offsetWidth + 24;
  const offset = currentIndex * cardWidth; // Changed from negative to positive for right direction
  projectContainer.style.transform = `translateX(${offset}px)`;

  setTimeout(() => (isScrolling = false), 800); // delay to make it smooth
});

// Start auto-sliding when the page loads
startAutoSlide();

// Pause auto-sliding when the user hovers over the projects
projectContainer.addEventListener('mouseenter', pauseAutoSlide);
projectContainer.addEventListener('mouseleave', startAutoSlide);
// ===== Popup Experience Functions =====
function openPopup(id) {
    document.getElementById(id).style.display = 'block';
  }
  function closePopup(id) {
    document.getElementById(id).style.display = 'none';
  }