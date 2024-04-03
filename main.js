let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}
// Hide Menu And Search Box On Scroll
window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');
}

// Header
let header = document.querySelector('header');

window.addEventListener('scroll' , () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});


// -----------------------------------------------------------------------

let marker = document.querySelector('#marker');
let item = document.querySelectorAll('nav a');

function indicator(e){
    marker.style.left = e.offsetLeft+'px';
    marker.style.width = e.offsetWidth+'px';
}

item.forEach(link => {
    link.addEventListener('click', (e) => {
        indicator(e.target);
    })
})
