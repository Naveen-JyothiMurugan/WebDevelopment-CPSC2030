async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent("navbar-placeholder", "/components/navbar.html");
loadComponent("slider-placeholder", "/components/slider.html");
loadComponent("card-placeholder", "/components/card.html");
loadComponent("modal-placeholder", "/components/modal.html");