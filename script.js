var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


const menu = document.querySelector('#menu-icon');
const navebar = document.querySelector('.navbar');

menu.addEventListener('click', function() {
  // event.defaultPrevented();

 menu.classList.toggle('bx-x');
 navebar.classList.toggle('active');
})

window.onscroll = () => {
  menu.classList.remove('bx-x');
  navebar.classList.remove('active');
}