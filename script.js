// -------------------------------------- for mobile nav toggle

const navShow = document.querySelector(".fa-bars");
const navList = document.querySelector("nav ul");
const navCLose = document.querySelector(".fa-xmark");

navShow.addEventListener("click", () => {
  navList.classList.toggle("show-nav");
});

navCLose.addEventListener("click", () => {
  navList.classList.toggle("show-nav");
});

// ----------------------------------------- for main left intersection observers

const mainLeftIntersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle(
        "main-left-intersection",
        entry.isIntersecting
      );
    });
  },
  {
    threshold: 0.3,
  }
);

const mainLeftIntersection = document.querySelector(
  ".main .main-wrapper .main-left"
);

mainLeftIntersectionObserver.observe(mainLeftIntersection);

// ----------------------------------------- for main right imgage intersection observers

const mainRightIntersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("image-intersection", entry.isIntersecting);
    });
  },
  {
    threshold: 0.3,
  }
);

const mainRightIntersection = document.querySelector(
  ".main .main-wrapper .main-right img"
);

mainRightIntersectionObserver.observe(mainRightIntersection);

// ------------------------------------------- for community uses intersection observer

const communityIntersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle(
        "move-community-intersection",
        entry.isIntersecting
      );
    });
  },
  {
    threshold: 0.2,
  }
);

const communityIntersection = document.querySelectorAll(
  ".community-intersection"
);
communityIntersection.forEach((e) => {
  communityIntersectionObserver.observe(e);
});

// ----------------------------------------- for testimonials carousel

const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const interval = 3000;

let slide = document.querySelectorAll(".slide");
let index = 1;
let loop;

const firstSlide = slide[0].cloneNode(true);
const lastSlide = slide[slide.length - 1].cloneNode(true);

firstSlide.id = "first-slide";
lastSlide.id = "last-slide";

carousel.append(firstSlide);
carousel.prepend(lastSlide);

const slideWidth = slide[index].clientWidth;

carousel.style.transform = `translateX(${-slideWidth * index}px)`;

const slideLoop = () => {
  loop = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll(".slide");

carousel.addEventListener("transitionend", () => {
  slides = getSlides();
  if (slides[index].id === firstSlide.id) {
    carousel.style.transition = "none";
    index = 1;
    carousel.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastSlide.id) {
    carousel.style.transition = "none";
    index = slides.length - 2;
    carousel.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slide = getSlides();
  if (index >= slide.length - 1) return;
  index++;
  carousel.style.transition = " .5s ease-out";
  carousel.style.transform = `translateX(${-slideWidth * index}px)`;
};

carousel.addEventListener("mouseenter", () => {
  clearInterval(loop);
});

prevBtn.addEventListener("click", () => {
  if (index <= 0) return;
  index--;
  carousel.style.transition = ".5s ease-in-out";
  carousel.style.transform = `translateX(${-slideWidth * index}px)`;
  clearInterval(loop);
});

prevBtn.addEventListener("mouseleave", slideLoop);

nextBtn.addEventListener("click", () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  carousel.style.transition = ".5s ease-in-out";
  carousel.style.transform = `translateX(${-slideWidth * index}px)`;
  clearInterval(loop);
});

nextBtn.addEventListener("mouseleave", slideLoop);

carousel.addEventListener("mouseleave", slideLoop);

slideLoop();
