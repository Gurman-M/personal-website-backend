/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    /* shows the navbar if scrolling up */
    document.getElementById("myNavbar").style.top = "0";
  } else {
    /* hides navbar if scrolling down */
    document.getElementById("myNavbar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}