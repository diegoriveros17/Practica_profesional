document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener sesión del usuario
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado) {
    window.location.href = "login.html";
    return;
  }

  console.log("Usuario logueado:", usuarioLogueado);

  // 2. Referencias a elementos del DOM (Coincidentes con dashboard.html)
  const userNombreSpan = document.getElementById("userNombre");
  const userRolSpan = document.getElementById("userRol");
  const panelCiudadano = document.getElementById("dashCiudadano");
  const panelRepresentante = document.getElementById("dashRepresentante"); // <-- Corregido id
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");

  const tituloPanel = document.getElementById("saludoUsuario");
  const bajadaPanel = document.querySelector(
    ".container.my-5.pt-5 p.text-muted",
  );
  const infoPerfilCiudadano = document.getElementById("infoPerfilCiudadano");

  // 3. Renderizar Nombre y Rol en Navbar/Header
  if (userNombreSpan) {
    userNombreSpan.textContent =
      `${usuarioLogueado.nombre || ""} ${usuarioLogueado.apellido || ""}`.trim();
  }

  // Extraer el texto del rol (cadena directa o traído de Sequelize)
  let rolTexto = "";
  if (typeof usuarioLogueado.rol === "string") {
    rolTexto = usuarioLogueado.rol;
  } else if (usuarioLogueado.rol && usuarioLogueado.rol.nombre) {
    rolTexto = usuarioLogueado.rol.nombre;
  }

  if (userRolSpan) {
    userRolSpan.textContent = rolTexto.toUpperCase();
  }

  // 4. Activar Vistas, Títulos e Información según el Rol
  const rolMiniscula = rolTexto.toLowerCase();

  if (rolMiniscula === "ciudadano") {
    if (tituloPanel)
      tituloPanel.textContent = `¡Hola, ${usuarioLogueado.nombre}!`;
    if (bajadaPanel)
      bajadaPanel.textContent =
        "Bienvenido/a. Desde aquí puedes ver tus inscripciones y gestionar tus cursos.";

    // Cargar datos en la tarjeta "Mis Datos"
    if (infoPerfilCiudadano) {
      infoPerfilCiudadano.innerHTML = `
        <p class="mb-1"><strong>Nombre:</strong> ${usuarioLogueado.nombre} ${usuarioLogueado.apellido}</p>
        <p class="mb-1"><strong>Email:</strong> ${usuarioLogueado.email}</p>
        ${usuarioLogueado.dni ? `<p class="mb-1"><strong>DNI:</strong> ${usuarioLogueado.dni}</p>` : ""}
        ${usuarioLogueado.direccion ? `<p class="mb-1"><strong>Dirección:</strong> ${usuarioLogueado.direccion}</p>` : ""}
        <span class="badge bg-primary mt-2">Ciudadano</span>
      `;
    }

    if (panelCiudadano) panelCiudadano.classList.remove("d-none");
    if (panelRepresentante) panelRepresentante.classList.add("d-none");

    // Renderizar tabla de inscripciones
    cargarTablaCiudadano(usuarioLogueado.id);
  } else if (rolMiniscula === "representante") {
    if (tituloPanel)
      tituloPanel.textContent = "Panel Institucional / Representante";
    if (bajadaPanel)
      bajadaPanel.textContent =
        "Bienvenido/a. Desde aquí puedes administrar la oferta de cursos de tu institución.";

    if (panelRepresentante) panelRepresentante.classList.remove("d-none");
    if (panelCiudadano) panelCiudadano.classList.add("d-none");

    // Renderizar métricas y tabla del representante
    cargarTablaRepresentante(usuarioLogueado.id);
  } else {
    if (tituloPanel) tituloPanel.textContent = "Mi Panel de Control";
    if (panelCiudadano) panelCiudadano.classList.remove("d-none");
  }

  // 5. Cerrar Sesión
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "login.html";
    });
  }
});

// ==========================================
// FUNCIONES AUXILIARES DE POBLADO DE TABLAS
// ==========================================

function cargarTablaCiudadano(usuarioId) {
  const tbody = document.getElementById("tablaInscripcionesCiudadano");
  if (!tbody) return;

  const inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || [];
  const misInscripciones = inscripciones.filter(
    (i) => i.usuarioId === usuarioId,
  );

  if (misInscripciones.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-3">
          No estás inscripto en ningún curso actualmente.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = misInscripciones
    .map(
      (item) => `
    <tr>
      <td>${item.cursoNombre || "Curso"}</td>
      <td>${item.institucion || "Institución"}</td>
      <td><span class="badge bg-success">${item.estado || "Cursando"}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-danger">Cancelar</button>
      </td>
    </tr>
  `,
    )
    .join("");
}

function cargarTablaRepresentante(usuarioId) {
  const tbody = document.getElementById("tablaCursosRepresentante");
  const metricas = document.getElementById("metricasRepresentante");
  if (!tbody) return;

  const cursos = JSON.parse(localStorage.getItem("cursos")) || [];

  if (metricas) {
    metricas.innerHTML = `
      <div class="col-md-6">
        <div class="card bg-primary text-white shadow-sm border-0 mb-3">
          <div class="card-body">
            <h6 class="card-title">Total Cursos Publicados</h6>
            <h3 class="fw-bold mb-0">${cursos.length}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card bg-success text-white shadow-sm border-0 mb-3">
          <div class="card-body">
            <h6 class="card-title">Total Inscriptos</h6>
            <h3 class="fw-bold mb-0">0</h3>
          </div>
        </div>
      </div>
    `;
  }

  if (cursos.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-3">
          No has publicado ningún curso todavía.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = cursos
    .map(
      (curso) => `
    <tr>
      <td>${curso.nombre}</td>
      <td>${curso.cupoMaximo || 0}</td>
      <td>0</td>
      <td>
        <button class="btn btn-sm btn-outline-primary">Editar</button>
      </td>
    </tr>
  `,
    )
    .join("");
}
