// Slider

let slideIndex = 0;
const reviews = document.querySelectorAll(".review");
const slidesToShow = 1; // Number of reviews to display at a time

showSlide(slideIndex);

function changeSlide(n) {
    if (n==1) {
        direction = 'next';
    }else{
        direction = 'prev';
    }
  showSlide(((slideIndex += n)),direction);
}

function showSlide(n,direction="next") {
    // console.log(n);
    // let direction = "next";
  const totalSlides = reviews.length;
  let i;
  if (slideIndex < totalSlides && slideIndex >= 0) {
    for (i = 0; i < totalSlides; i++) {
      //   reviews[i].style.display = "none"; // Hide all reviews
      reviews[i].classList.remove("show");
      reviews[i].classList.remove("next");
      reviews[i].classList.remove("prev");
    }

    let endIndex = slideIndex + slidesToShow;
    if (endIndex > totalSlides) {
      endIndex = totalSlides;
    }

    for (i = slideIndex; i < endIndex; i++) {
      //   reviews[i].style.display = "block"; // Display selected reviews
        console.log(direction);
      if (direction == "next") {
        reviews[i].classList.add("next");
      } else {
        reviews[i].classList.add("prev");
      }

      reviews[i].classList.add("show");
    }
  } else if (slideIndex < 0) {
    showSlide((slideIndex = totalSlides - 1),'prev');
  } else {
    showSlide((slideIndex = 0));
  }
}

setInterval(() => {
  changeSlide(1);
}, 5000);

const dragBox = document.querySelector(".slides");
let isDragging = false;
let startPosition = 0;
let endPosition = 0;
let value = 10; // Initial value
let dragDirection = null; // Variable to track drag direction
let currentDragDirection = null; // Variable to track drag direction

dragBox.addEventListener("mousedown", startDrag);
dragBox.addEventListener("touchstart", startDrag);

document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag);

document.addEventListener("mouseup", endDrag);
document.addEventListener("touchend", endDrag);

function startDrag(event) {
  event.preventDefault();
  isDragging = true;
  if (event.type === "touchstart") {
    startPosition = event.touches[0].clientX;
  } else {
    startPosition = event.clientX;
  }
}

function drag(event) {
  event.preventDefault();
  if (isDragging) {
    if (event.type === "touchmove") {
      endPosition = event.touches[0].clientX;
    } else {
      endPosition = event.clientX;
    }
    currentDragDirection = endPosition > startPosition ? "right" : "left";
  }
}

function endDrag() {
  if (dragDirection !== currentDragDirection) {
    dragDirection = currentDragDirection;
    if (dragDirection === "right") {
      changeSlide(-1);
    } else {
      changeSlide(1);
    }
  }

  //   console.log("Dragging direction:", dragDirection);
  isDragging = false;
  dragDirection = null;
}

// Menu

const menuBtn = document.querySelector(".sidenav-trigger");
const menu = document.getElementById("mobile-demo");

menuBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  menu.classList.toggle("active");
});
document.body.addEventListener("click", function (event) {
  if (!menu.contains(event.target) && !event.target.matches(".sidenav-trigger")) {
    menu.classList.remove("active");
  }
});
