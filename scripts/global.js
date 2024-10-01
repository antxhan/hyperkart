function createParticles() {
  const partclesContainer = document.querySelector(".particles-container");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";
    const randomSize = Math.random() * 3 + "px";
    particle.style.width = randomSize;
    particle.style.height = randomSize;
    particle.style.backgroundColor = "#fff";
    partclesContainer.appendChild(particle);
  }
}

function transformParticles() {
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle) => {
    // particle.style.scale = Math.random() * 0.5 + 0.5;
    particle.style.opacity = Math.random() * 0.5 + 0.5;
  });
}

function affectParticles() {
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle) => {
    // const x = particle.offsetLeft;
    // const newX = x - Math.random() * -2 - 1;
    // particle.style.left = newX + "px";
    const y = particle.offsetTop;
    const newY = y - Math.random() * 2 - 1;
    particle.style.top = newY + "px";
    if (y < 0) {
      particle.style.top = window.innerHeight + "px";
    }
  });
}

function renderParticles() {
  createParticles();
  setInterval(affectParticles, 33);
  setInterval(transformParticles, 1000);
}

// renderParticles();
