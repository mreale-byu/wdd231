/* Fills the footer with the current year and the page's last modified date. */

document.getElementById("lastModified").textContent = document.lastModified;
document.getElementById("currentyear").textContent = new Date().getFullYear();
