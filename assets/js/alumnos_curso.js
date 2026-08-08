document.addEventListener("DOMContentLoaded", () => {
  // Guardián de seguridad rápido
  const sesionActiva = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!sesionActiva || sesionActiva.rol !== "representante") {
    window.location.href = "index.html";
    return;
  }

  // Capturar el ID del curso enviado por URL (Ejemplo: alumnos_x_curso.html?id=1)
  const parametrosURL = new URLSearchParams(window.location.search);
  const cursoId = parseInt(parametrosURL.get("id"));

  if (!cursoId) {
    window.location.href = "dashboard.html";
    return;
  }

  // Traer colecciones del LocalStorage
  const listaCursos = JSON.parse(localStorage.getItem("cursos")) || [];
  const listaInscripciones =
    JSON.parse(localStorage.getItem("inscripciones")) || [];
  const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar el curso en cuestión
  const cursoActual = listaCursos.find((c) => c.id === cursoId);
  if (!cursoActual) {
    window.location.href = "dashboard.html";
    return;
  }

  // Setear título dinámico
  document.getElementById("nombreCursoTitulo").innerText =
    `Gestión de Alumnos: ${cursoActual.nombre}`;

  // Filtrar inscripciones de este curso específico
  const alumnosInscritos = listaInscripciones.filter(
    (ins) => ins.cursoId === cursoId,
  );
  const tablaBody = document.getElementById("tablaAlumnosInscritos");

  if (alumnosInscritos.length === 0) {
    tablaBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No hay alumnos registrados en este curso todavía.</td></tr>`;
    return;
  }

  tablaBody.innerHTML = "";
  alumnosInscritos.forEach((ins, index) => {
    const alumno = listaUsuarios.find((u) => u.id === ins.usuarioId);
    if (alumno) {
      const badgeEstado =
        ins.estado === "Finalizado"
          ? `<span class="badge bg-success">Finalizado</span>`
          : `<span class="badge bg-warning text-dark">Cursando</span>`;

      tablaBody.innerHTML += `
        <tr>
          <td class="fw-bold">${index + 1}</td>
          <td>${alumno.nombre} ${alumno.apellido}</td>
          <td>${alumno.dni}</td>
          <td>${badgeEstado}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-primary" onclick="mostrarModalContacto(${alumno.id}, '${ins.estado}')">
              <i class="bi bi-telephone-outbound-fill"></i> Ver Contacto
            </button>
          </td>
        </tr>
      `;
    }
  });
});

// Función global para inyectar datos del alumno seleccionado en el modal y abrirlo
function mostrarModalContacto(alumnoId, estadoCurso) {
  const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const alumno = listaUsuarios.find((u) => u.id === alumnoId);

  if (!alumno) return;

  const contenedorModal = document.getElementById("cuerpoModalContacto");
  contenedorModal.innerHTML = `
    <div class="text-center mb-3">
      <div class="display-5 text-primary"><i class="bi bi-person-badge"></i></div>
      <h4 class="fw-bold mt-1">${alumno.nombre} ${alumno.apellido}</h4>
      <span class="badge bg-secondary">DNI: ${alumno.dni}</span>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span><i class="bi bi-envelope-fill text-muted me-2"></i>Email</span>
        <a href="mailto:${alumno.email}" class="text-decoration-none fw-semibold">${alumno.email}</a>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span><i class="bi bi-geo-alt-fill text-muted me-2"></i>Dirección</span>
        <span class="fw-semibold text-end">${alumno.direccion || "No declarada"}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span><i class="bi bi-info-circle-fill text-muted me-2"></i>Condición</span>
        <span class="fw-semibold">${estadoCurso}</span>
      </li>
    </ul>
    <div class="alert alert-info mt-3 mb-0 small text-center" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-1"></i> Utilice estas vías exclusivamente para coordinar vacantes.
    </div>
  `;

  // Lanzar el modal de manera limpia usando la API nativa de Bootstrap
  const modalElement = document.getElementById("modalContactoAlumno");
  const modalBootstrap = new bootstrap.Modal(modalElement);
  modalBootstrap.show();
}
