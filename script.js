const giftBox = document.getElementById("giftBox");
const photoContainer = document.getElementById("photoContainer");
const closeBtn = document.getElementById("closeBtn");
const dots = document.querySelectorAll(".dot");
const photoFrames = document.querySelectorAll(".photo-frame");
const loveMessage = document.getElementById("loveMessage");
const starsContainer = document.getElementById("starsContainer");

let clickCount = 0;
let currentPhotoIndex = 0;
let slideInterval;

const flowers = ["🌹", "🌺", "🌸", "🌼", "🌻", "🌷", "💐", "🏵️", "🌿"];
const loveMessages = [
  "You make my heart bloom! 🌸💕",
  "Every moment with you is precious! 💖",
  "You're my forever Valentine! 💝",
  "Love you to the moon and back! 🌙✨",
];

// Create Starry Night Sky
function createStars() {
  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.width = Math.random() * 3 + "px";
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 3 + "s";
    starsContainer.appendChild(star);
  }

  // Add shooting stars
  for (let i = 0; i < 3; i++) {
    const shootingStar = document.createElement("div");
    shootingStar.className = "shooting-star";
    shootingStar.style.left = Math.random() * 100 + "%";
    shootingStar.style.top = Math.random() * 50 + "%";
    shootingStar.style.width = Math.random() * 100 + 100 + "px";
    shootingStar.style.animationDelay = Math.random() * 5 + "s";
    starsContainer.appendChild(shootingStar);
  }
}

// Create Floating Hearts
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = ["💕", "💖", "💗", "💓", "💘", "💝"][
    Math.floor(Math.random() * 6)
  ];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.bottom = "-50px";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

// Create continuous floating hearts
setInterval(createFloatingHeart, 1000);

// Create Realistic Flower Petals with Burst Effect
function createPetalBurst(count = 30) {
  const photoRect = photoContainer.getBoundingClientRect();
  const centerX = photoRect.left + photoRect.width / 2;
  const centerY = photoRect.top + photoRect.height / 2;

  // Create explosion burst of petals surrounding the photo
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("div");
    petal.className = "petal burst";

    // Random position around the photo container (360 degrees)
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const startDistance = Math.random() * 50 + 100; // Start from around the photo
    const endDistance = Math.random() * 300 + 200; // Burst outward

    const startX = Math.cos(angle) * startDistance;
    const startY = Math.sin(angle) * startDistance;
    const endX = Math.cos(angle) * endDistance;
    const endY = Math.sin(angle) * endDistance;

    petal.style.left = centerX + startX + "px";
    petal.style.top = centerY + startY + "px";
    petal.style.setProperty("--tx", endX - startX + "px");
    petal.style.setProperty("--ty", endY - startY + "px");
    petal.style.setProperty("--rotation", Math.random() * 720 + "deg");

    // More vibrant colors
    const colors = ["#ff1493", "#ff69b4", "#ff85b3", "#ffb6c1", "#ffc0cb"];
    petal.style.background = `radial-gradient(ellipse at center, ${colors[Math.floor(Math.random() * colors.length)]}, #ff1493)`;

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 2000);
  }
}

function createFloatingPetal(count = 15) {
  const photoRect = photoContainer.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const petal = document.createElement("div");
      petal.className = "petal float";

      // Random starting position around the photo (top, bottom, left, right)
      const side = Math.floor(Math.random() * 4);
      let startX, startY;

      if (side === 0) {
        // Top
        startX = photoRect.left + Math.random() * photoRect.width;
        startY = photoRect.top - 50;
      } else if (side === 1) {
        // Right
        startX = photoRect.right + 50;
        startY = photoRect.top + Math.random() * photoRect.height;
      } else if (side === 2) {
        // Bottom
        startX = photoRect.left + Math.random() * photoRect.width;
        startY = photoRect.bottom + 50;
      } else {
        // Left
        startX = photoRect.left - 50;
        startY = photoRect.top + Math.random() * photoRect.height;
      }

      petal.style.left = startX + "px";
      petal.style.top = startY + "px";
      petal.style.setProperty("--drift", (Math.random() - 0.5) * 400 + "px");

      // More vibrant colors
      const colors = ["#ff1493", "#ff69b4", "#ff85b3", "#ffb6c1", "#ffc0cb"];
      petal.style.background = `radial-gradient(ellipse at center, ${colors[Math.floor(Math.random() * colors.length)]}, #ff1493)`;

      document.body.appendChild(petal);

      setTimeout(() => petal.remove(), 4000);
    }, i * 50);
  }
}

function createFlower(count = 20) {
  const photoRect = photoContainer.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

      // Random starting position around the photo (all 4 sides)
      const side = Math.floor(Math.random() * 4);
      let startX, startY;

      if (side === 0) {
        // Top
        startX = photoRect.left + Math.random() * photoRect.width;
        startY = photoRect.top - 100;
      } else if (side === 1) {
        // Right
        startX = photoRect.right + 100;
        startY = photoRect.top + Math.random() * photoRect.height;
      } else if (side === 2) {
        // Bottom
        startX = photoRect.left + Math.random() * photoRect.width;
        startY = photoRect.bottom + 100;
      } else {
        // Left
        startX = photoRect.left - 100;
        startY = photoRect.top + Math.random() * photoRect.height;
      }

      flower.style.left = startX + "px";
      flower.style.top = startY + "px";

      const drift = (Math.random() - 0.5) * 300;
      flower.style.setProperty("--drift", drift + "px");

      document.body.appendChild(flower);

      setTimeout(() => flower.remove(), 3000);
    }, i * 80);
  }
}

// Typing Effect for Love Message
function typeMessage() {
  const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
  let index = 0;
  loveMessage.textContent = "";
  loveMessage.style.display = "inline-block";
  loveMessage.classList.remove("typed");

  const typeInterval = setInterval(() => {
    if (index < message.length) {
      loveMessage.textContent += message[index];
      index++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        loveMessage.classList.add("typed");
      }, 500);
    }
  }, 100);
}

function openGift() {
  clickCount++;

  // Show click counter
  const counter = document.createElement("div");
  counter.className = "click-counter";
  counter.textContent = "💕 " + clickCount + " 💕";
  document.body.appendChild(counter);
  setTimeout(() => counter.remove(), 600);

  // Calculate petal count based on clicks (UNLIMITED - more petals with each click)
  const petalBurstCount = Math.min(40 + clickCount * 15, 150);
  const floatingPetalCount = Math.min(25 + clickCount * 10, 100);
  const flowerCount = Math.min(30 + clickCount * 10, 100);

  // Show photo container on first click
  if (clickCount === 1) {
    photoContainer.classList.add("show");
    startSlideshow();
    typeMessage();
  }

  // Petal burst explosion
  setTimeout(() => createPetalBurst(petalBurstCount), 100);

  // Create floating petals
  setTimeout(() => createFloatingPetal(floatingPetalCount), 300);

  // Create emoji flowers
  setTimeout(() => createFlower(flowerCount), 500);
}

function showPhoto(index) {
  photoFrames.forEach((frame, i) => {
    frame.classList.remove("active");
    dots[i].classList.remove("active");
  });

  photoFrames[index].classList.add("active");
  dots[index].classList.add("active");
  currentPhotoIndex = index;
}

function nextPhoto() {
  const nextIndex = (currentPhotoIndex + 1) % photoFrames.length;
  showPhoto(nextIndex);
}

function startSlideshow() {
  slideInterval = setInterval(nextPhoto, 4000);
}

function stopSlideshow() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

const valentineMsgBox = document.getElementById("valentineMsgBox");
const valentineLongMessage = document.getElementById("valentineLongMessage");

const paragraphs = [
  `On this special Valentine's Day, I just want to tell you how much you mean to me. 
Every moment we share makes my heart bloom like the most beautiful flowers. 🌸🌹`,
];

valentineMsgBox.addEventListener("click", () => {
  // Clear previous content
  valentineLongMessage.innerHTML = "";
  valentineLongMessage.style.opacity = "1";

  let paraIndex = 0;

  function typeParagraph() {
    if (paraIndex >= paragraphs.length) return; // all done

    const para = document.createElement("p");
    para.classList.add("typed-paragraph");
    valentineLongMessage.appendChild(para);

    let charIndex = 0;
    const paragraph = paragraphs[paraIndex];

    const typeInterval = setInterval(() => {
      if (charIndex < paragraph.length) {
        para.textContent += paragraph[charIndex];
        charIndex++;
      } else {
        clearInterval(typeInterval);
        paraIndex++;
        setTimeout(typeParagraph, 800); // delay before next paragraph
      }
    }, 50); // typing speed in ms
  }

  typeParagraph();
});

// Event Listeners
giftBox.addEventListener("click", openGift);

closeBtn.addEventListener("click", () => {
  photoContainer.classList.remove("show");
  stopSlideshow();
  loveMessage.classList.remove("typed");
  loveMessage.textContent = "";
  clickCount = 0;
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopSlideshow();
    showPhoto(index);
    startSlideshow();
  });
});

// Initialize stars on load
createStars();
