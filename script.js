const giftBox = document.getElementById("giftBox");
const photoContainer = document.getElementById("photoContainer");
const closeBtn = document.getElementById("closeBtn");
const dots = document.querySelectorAll(".dot");
const photoFrames = document.querySelectorAll(".photo-frame");
const loveMessage = document.getElementById("loveMessage");
const starsContainer = document.getElementById("starsContainer");
const sideLayout = document.getElementById("sideLayout");
const typedMessage = document.getElementById("typedMessage");
const rightFlowers = document.getElementById("rightFlowers");

let clickCount = 0;
let currentPhotoIndex = 0;
let slideInterval;
let flowerInterval;

const flowers = ["🌸", "🌺", "🌹", "🌷", "💐", "🌼", "🏵️", "🫧", "🍓"];
const loveMessages = [
  "You make my heart bloom! 🌸💕",
  "Every moment with you is precious! 💖",
  "You're my forever Valentine! 💝",
  "Love you to the moon and back! 🌙✨",
];

const longMessage = `Goodmorning Hann! ❤️
Untana ma open nimo ni remember i always love you bsag sge kag tukar mladita rag amaw haha another month nasab padayon ghapon ta hehe way mag bag o
Happy Monthsarry hann and iloveyouuu so much mwuah 🌸💕 🌹`;

// Create Starry Sky (blush-toned sparkles)
function createStars() {
  for (let i = 0; i < 160; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    const size = Math.random() * 4 + 2 + "px";
    star.style.width = size;
    star.style.height = size;
    star.style.animationDelay = Math.random() * 3 + "s";
    starsContainer.appendChild(star);
  }

  for (let i = 0; i < 4; i++) {
    const shootingStar = document.createElement("div");
    shootingStar.className = "shooting-star";
    shootingStar.style.left = Math.random() * 100 + "%";
    shootingStar.style.top = Math.random() * 50 + "%";
    shootingStar.style.width = Math.random() * 100 + 80 + "px";
    shootingStar.style.animationDelay = Math.random() * 6 + "s";
    starsContainer.appendChild(shootingStar);
  }
}

// Floating Hearts
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = ["💕", "💖", "💗", "💓", "💘", "💝", "🩷"][
    Math.floor(Math.random() * 7)
  ];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.bottom = "-50px";
  heart.style.animationDuration = Math.random() * 3 + 5 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

setInterval(createFloatingHeart, 900);

// Petal burst — blush/rose tones
function createPetalBurst(count = 28) {
  const photoRect = photoContainer.getBoundingClientRect();
  const centerX = photoRect.left + photoRect.width / 2;
  const centerY = photoRect.top + photoRect.height / 2;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("div");
    petal.className = "petal burst";

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const startDistance = Math.random() * 50 + 80;
    const endDistance = Math.random() * 280 + 180;

    const startX = Math.cos(angle) * startDistance;
    const startY = Math.sin(angle) * startDistance;
    const endX = Math.cos(angle) * endDistance;
    const endY = Math.sin(angle) * endDistance;

    petal.style.left = centerX + startX + "px";
    petal.style.top = centerY + startY + "px";
    petal.style.setProperty("--tx", endX - startX + "px");
    petal.style.setProperty("--ty", endY - startY + "px");
    petal.style.setProperty("--rotation", Math.random() * 720 + "deg");

    // Blush/rose palette
    const colors = [
      "#ffb3cc",
      "#ff85b3",
      "#ffd5e8",
      "#e0547e",
      "#ffc0d9",
      "#ff69a0",
    ];
    petal.style.background = `radial-gradient(ellipse at center, ${colors[Math.floor(Math.random() * colors.length)]}, #e0547e)`;

    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 2000);
  }
}

function createFloatingPetal(count = 12) {
  const photoRect = photoContainer.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const petal = document.createElement("div");
      petal.className = "petal float";

      const side = Math.floor(Math.random() * 4);
      let startX, startY;
      if (side === 0) {
        startX = photoRect.left + Math.random() * photoRect.width;
        startY = photoRect.top - 50;
      } else if (side === 1) {
        startX = photoRect.right + 50;
        startY = photoRect.top + Math.random() * photoRect.height;
      } else if (side === 2) {
        startX = photoRect.left + Math.random() * photoRect.width;
        startY = photoRect.bottom + 50;
      } else {
        startX = photoRect.left - 50;
        startY = photoRect.top + Math.random() * photoRect.height;
      }

      petal.style.left = startX + "px";
      petal.style.top = startY + "px";
      petal.style.setProperty("--drift", (Math.random() - 0.5) * 380 + "px");

      const colors = ["#ffb3cc", "#ff85b3", "#ffd5e8", "#e0547e", "#ffc0d9"];
      petal.style.background = `radial-gradient(ellipse at center, ${colors[Math.floor(Math.random() * colors.length)]}, #e0547e)`;

      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 4500);
    }, i * 55);
  }
}

function createFlower(count = 18) {
  const photoRect = photoContainer.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

      const side = Math.floor(Math.random() * 4);
      let startX, startY;
      if (side === 0) {
        startX = photoRect.left + Math.random() * photoRect.width;
        startY = photoRect.top - 80;
      } else if (side === 1) {
        startX = photoRect.right + 80;
        startY = photoRect.top + Math.random() * photoRect.height;
      } else if (side === 2) {
        startX = photoRect.left + Math.random() * photoRect.width;
        startY = photoRect.bottom + 80;
      } else {
        startX = photoRect.left - 80;
        startY = photoRect.top + Math.random() * photoRect.height;
      }

      flower.style.left = startX + "px";
      flower.style.top = startY + "px";
      flower.style.setProperty("--drift", (Math.random() - 0.5) * 280 + "px");

      document.body.appendChild(flower);
      setTimeout(() => flower.remove(), 3500);
    }, i * 80);
  }
}

// Growing flowers from pot
function createRightFlower() {
  if (!rightFlowers) return;

  const flower = document.createElement("div");
  flower.className = "right-side-flower";
  flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

  const offset = (Math.random() - 0.5) * 55;
  flower.style.left = `calc(50% + ${offset}px)`;

  const duration = Math.random() * 2 + 4.5;
  flower.style.animationDuration = duration + "s";

  rightFlowers.appendChild(flower);
  setTimeout(() => {
    if (flower && flower.parentNode) flower.remove();
  }, duration * 1000);
}

// Typing animation for left message
function typeLeftMessage() {
  let index = 0;
  typedMessage.textContent = "";
  const typeInterval = setInterval(() => {
    if (index < longMessage.length) {
      typedMessage.textContent += longMessage[index];
      index++;
    } else {
      clearInterval(typeInterval);
    }
  }, 28);
}

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
      setTimeout(() => loveMessage.classList.add("typed"), 500);
    }
  }, 95);
}

function openGift() {
  clickCount++;

  const counter = document.createElement("div");
  counter.className = "click-counter";
  counter.textContent = "🩷 " + clickCount + " 🩷";
  document.body.appendChild(counter);
  setTimeout(() => counter.remove(), 600);

  const petalBurstCount = Math.min(35 + clickCount * 12, 130);
  const floatingPetalCount = Math.min(20 + clickCount * 8, 90);
  const flowerCount = Math.min(25 + clickCount * 8, 90);

  if (clickCount === 1) {
    photoContainer.classList.add("show");
    sideLayout.classList.add("show");
    startSlideshow();
    typeMessage();
    typeLeftMessage();

    if (rightFlowers) {
      for (let i = 0; i < 10; i++)
        setTimeout(() => createRightFlower(), i * 100);
      flowerInterval = setInterval(createRightFlower, 600);
    }
  }

  setTimeout(() => createPetalBurst(petalBurstCount), 100);
  setTimeout(() => createFloatingPetal(floatingPetalCount), 300);
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
  showPhoto((currentPhotoIndex + 1) % photoFrames.length);
}

function startSlideshow() {
  slideInterval = setInterval(nextPhoto, 4000);
}

function stopSlideshow() {
  if (slideInterval) clearInterval(slideInterval);
}

giftBox.addEventListener("click", openGift);

closeBtn.addEventListener("click", () => {
  photoContainer.classList.remove("show");
  sideLayout.classList.remove("show");
  stopSlideshow();
  if (flowerInterval) {
    clearInterval(flowerInterval);
    flowerInterval = null;
  }
  if (rightFlowers) rightFlowers.innerHTML = "";
  loveMessage.classList.remove("typed");
  loveMessage.textContent = "";
  typedMessage.textContent = "";
  clickCount = 0;
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopSlideshow();
    showPhoto(index);
    startSlideshow();
  });
});

createStars();
