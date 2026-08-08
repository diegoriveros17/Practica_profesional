// assets/js/navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const menuDinamico = document.getElementById("menuDinamico");
  if (!menuDinamico) return;

  const sesion = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (sesion) {
    // --- USUARIO LOGUEADO: Muestra Inicio, Ir al Panel, Nombre y Cerrar Sesión ---
    menuDinamico.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="index.html">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-warning" href="dashboard.html"><i class="bi bi-speedometer2 me-1"></i>Mi Panel</a>
      </li>
      <li class="nav-item ms-lg-3">
        <span class="nav-link text-info"><i class="bi bi-person-fill me-1"></i>${sesion.nombre} ${sesion.apellido}</span>
      </li>
      <li class="nav-item ms-lg-auto">
        <a class="nav-link text-danger" href="#" id="btnCerrarSesion"><i class="bi bi-box-arrow-right me-1"></i>Cerrar Sesión</a>
      </li>
    `;

    // Programar el botón de Cerrar Sesión de forma segura
    document
      .getElementById("btnCerrarSesion")
      .addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "index.html";
      });
  } else {
    // --- USUARIO INVITADO: Muestra Inicio, Iniciar Sesión y Registrarse ---
    menuDinamico.innerHTML = `
      <li class="nav-item">
        <a class="nav-link" href="index.html">Inicio</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="login.html">Iniciar Sesión</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="formulario_registro.html">Registrate</a>
      </li>
    `;
  }
});
