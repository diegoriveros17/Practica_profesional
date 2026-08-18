document.addEventListener("DOMContentLoaded", () => {
  // 1. Obtener el ID del curso desde la URL (?id)
  const urlParams = new URLSearchParams(window.location.search);
  const idCurso = parseInt(urlParams.keys().next().value);

  // 2. Traer los cursos desde el LocalStorage
  const listaCursos = JSON.parse(localStorage.getItem("cursos")) || [];

  // 3. Buscar el curso específico que coincida con ese ID
  const cursoEncontrado = listaCursos.find((c) => c.id === idCurso);

  const contenedor = document.getElementById("contenedorDetalle");

  if (cursoEncontrado) {
    // Generamos los items de la lista de requisitos dinámicamente
    let requisitosHTML = "";
    cursoEncontrado.requisitos.forEach((req) => {
      requisitosHTML += `<li class="list-group-item">🔹 ${req}</li>`;
    });

    // 4. Inyectamos la tarjeta del detalle + Modal Confirmación + Modal Formulario
    contenedor.innerHTML = `
      <div class="card shadow-lg border-0 overflow-hidden">
        <div class="row g-0">
          <div class="col-md-5">
            <img src="${cursoEncontrado.imagen}" class="img-fluid h-100 w-100" style="object-fit: cover; min-height: 300px;" alt="${cursoEncontrado.nombre}">
          </div>
          
          <div class="col-md-7 p-4 p-md-5 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-primary fs-6">${cursoEncontrado.categoria}</span>
                <span class="badge bg-success fs-6">${cursoEncontrado.precio === 0 ? "Gratuito" : "$" + cursoEncontrado.precio}</span>
              </div>
              
              <h1 class="display-6 fw-bold text-dark mb-3">${cursoEncontrado.nombre}</h1>
              <p class="text-muted mb-2"><strong>Dictado por:</strong> ${cursoEncontrado.institucion}</p>
              <p class="fs-5 text-secondary mb-4">${cursoEncontrado.descripcion}</p>
              
              <h5 class="fw-bold mb-2">Requisitos para la inscripción:</h5>
              <ul class="list-group list-group-flush mb-4">
                ${requisitosHTML}
              </ul>

              <h5 class="fw-bold mb-2">Información de Cursada:</h5>
              <p class="mb-1"><strong>📍 Lugar:</strong> ${cursoEncontrado.lugar} (${cursoEncontrado.direccion})</p>
              <p class="text-muted small mb-3">🗺️ <em>Ref: ${cursoEncontrado.referencia}</em></p>
              <p class="mb-1"><strong>📅 Duración:</strong> ${cursoEncontrado.duracion} (Inicia: ${cursoEncontrado.fechaInicio})</p>
              <p class="mb-1"><strong>👥 Cupos Disponibles:</strong> ${cursoEncontrado.cuposDisponibles} de ${cursoEncontrado.cupoMaximo}</p>
            </div>

            <div class="mt-4">
              <button class="btn btn-dark btn-lg w-100" id="btnInscribirse">Inscribirme a este Curso</button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL DE CONFIRMACIÓN (PARA USUARIOS LOGUEADOS) -->
      <div class="modal fade" id="modalChoice" tabindex="-1" aria-labelledby="modalChoiceLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-3 shadow">
            <div class="modal-body p-4 ">
              <h5 class="mb-2 fw-bold" id="modalChoiceNombre"></h5>
              <p class="mb-0 text-secondary">¿Deseas confirmar tu inscripción al curso <strong class="text-dark">"${cursoEncontrado.nombre}"</strong>?</p>
            </div>
            <div class="modal-footer flex-nowrap p-0">
              <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end fw-bold text-success" id="btnConfirmarLogueado">Sí, inscribirme</button>
              <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 text-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL FORMULARIO DE INSCRIPCIÓN (PARA USUARIOS NO LOGUEADOS) -->
      <div class="modal fade" id="modalInscripcion" tabindex="-1" aria-labelledby="modalInscripcionLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="modalInscripcionLabel">Formulario de Inscripción - ${cursoEncontrado.nombre}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-start">
              <p class="text-muted mb-3">Ingresa tus datos personales para completar tu inscripción:</p>
              <form id="formInscripcion">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="insNombre" class="form-label fw-semibold">Nombre</label>
                    <input type="text" class="form-control" id="insNombre" required>
                  </div>
                  <div class="col-md-6">
                    <label for="insApellido" class="form-label fw-semibold">Apellido</label>
                    <input type="text" class="form-control" id="insApellido" required>
                  </div>
                  <div class="col-md-6">
                    <label for="insDni" class="form-label fw-semibold">DNI / Documento</label>
                    <input type="text" class="form-control" id="insDni" required>
                  </div>
                  <div class="col-md-6">
                    <label for="insEdad" class="form-label fw-semibold">Edad</label>
                    <input type="number" class="form-control" id="insEdad" min="12" max="100" required>
                  </div>
                  <div class="col-md-6">
                    <label for="insCorreo" class="form-label fw-semibold">Correo Electrónico</label>
                    <input type="email" class="form-control" id="insCorreo" required>
                  </div>
                  <div class="col-md-6">
                    <label for="insTelefono" class="form-label fw-semibold">Teléfono / WhatsApp</label>
                    <input type="tel" class="form-control" id="insTelefono" required>
                  </div>
                  <div class="col-12">
                    <label for="insDireccion" class="form-label fw-semibold">Dirección</label>
                    <input type="text" class="form-control" id="insDireccion" required>
                  </div>
                </div>
                <div class="mt-4 d-flex justify-content-end gap-2">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" class="btn btn-success">Confirmar Inscripción</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    // Instanciamos los modales con Bootstrap
    const modalChoiceBS = new bootstrap.Modal(
      document.getElementById("modalChoice"),
    );
    const modalInscripcionBS = new bootstrap.Modal(
      document.getElementById("modalInscripcion"),
    );

    // Función auxiliar para registrar la inscripción en LocalStorage
    const guardarInscripcion = (datos) => {
      const inscripcionesGuardadas =
        JSON.parse(localStorage.getItem("inscripciones")) || [];
      inscripcionesGuardadas.push(datos);
      localStorage.setItem(
        "inscripciones",
        JSON.stringify(inscripcionesGuardadas),
      );
    };

    // 5. EVENTO DEL BOTÓN PRINCIPAL "INSCRIBIRME A ESTE CURSO"
    document.getElementById("btnInscribirse").addEventListener("click", () => {
      const usuarioLogueado = JSON.parse(
        localStorage.getItem("usuarioLogueado"),
      );

      if (usuarioLogueado) {
        // USUARIO LOGUEADO: Seteamos el saludo y mostramos el modalChoice
        document.getElementById("modalChoiceNombre").textContent =
          `👋 ¡Hola ${usuarioLogueado.nombre}!`;
        modalChoiceBS.show();
      } else {
        // USUARIO NO LOGUEADO: Mostramos el modal de formulario
        modalInscripcionBS.show();
      }
    });

    // 6. EVENTO CONFIRMAR INSCRIPCIÓN (USUARIO LOGUEADO)
    document
      .getElementById("btnConfirmarLogueado")
      .addEventListener("click", () => {
        const usuarioLogueado = JSON.parse(
          localStorage.getItem("usuarioLogueado"),
        );

        if (usuarioLogueado) {
          const datosInscripcion = {
            idCurso: cursoEncontrado.id,
            nombreCurso: cursoEncontrado.nombre,
            nombre: usuarioLogueado.nombre,
            apellido: usuarioLogueado.apellido || "No especificado",
            dni: usuarioLogueado.dni || "No especificado",
            edad: usuarioLogueado.edad || "No especificada",
            correo: usuarioLogueado.email || usuarioLogueado.correo,
            telefono: usuarioLogueado.telefono || "No especificado",
            direccion: usuarioLogueado.direccion || "No especificada",
            fechaInscripcion: new Date().toLocaleDateString(),
          };

          guardarInscripcion(datosInscripcion);
          modalChoiceBS.hide();
          alert(
            `¡Inscripción exitosa! Te has registrado a ${cursoEncontrado.nombre}.`,
          );
        }
      });

    // 7. EVENTO PROCESAR FORMULARIO (USUARIOS NO LOGUEADOS)
    document
      .getElementById("formInscripcion")
      .addEventListener("submit", (e) => {
        e.preventDefault();

        const datosInscripcion = {
          idCurso: cursoEncontrado.id,
          nombreCurso: cursoEncontrado.nombre,
          nombre: document.getElementById("insNombre").value,
          apellido: document.getElementById("insApellido").value,
          dni: document.getElementById("insDni").value,
          edad: document.getElementById("insEdad").value,
          correo: document.getElementById("insCorreo").value,
          telefono: document.getElementById("insTelefono").value,
          direccion: document.getElementById("insDireccion").value,
          fechaInscripcion: new Date().toLocaleDateString(),
        };

        guardarInscripcion(datosInscripcion);
        modalInscripcionBS.hide();
        alert(
          `¡Inscripción exitosa! Te has registrado al curso: ${cursoEncontrado.nombre}`,
        );
        document.getElementById("formInscripcion").reset();
      });
  } else {
    contenedor.innerHTML = `
      <div class="alert alert-danger text-center shadow-sm" role="alert">
        <h4 class="alert-heading">¡Curso no encontrado!</h4>
        <p>El curso que estás intentando buscar no existe o no está disponible en este momento.</p>
        <hr>
        <a href="index.html" class="btn btn-outline-danger">Volver al Inicio</a>
      </div>
    `;
  }
});

// --- CONTROL DE SESIÓN EN LA PÁGINA DE DETALLES ---
const sesionActiva = JSON.parse(localStorage.getItem("usuarioLogueado"));

const botonLogin = document.querySelector('a[href*="login"]')?.parentElement;
const botonRegistro =
  document.querySelector('a[href*="registro"]')?.parentElement ||
  document.querySelector('a[href*="Register"]')?.parentElement;
const navMenu = document.querySelector(".navbar-nav");

if (sesionActiva && navMenu) {
  if (botonLogin) botonLogin.style.display = "none";
  if (botonRegistro) botonRegistro.style.display = "none";

  const liUsuario = document.createElement("li");
  liUsuario.className = "nav-item d-flex align-items-center me-3";
  liUsuario.innerHTML = `<span class="text-white fw-bold">👋 Hola, ${sesionActiva.nombre}</span>`;

  const liCerrarSesion = document.createElement("li");
  liCerrarSesion.className = "nav-item";
  liCerrarSesion.innerHTML = `<a class="btn btn-sm btn-danger ms-2" id="btnCerrarSesionDetalle" href="#">Cerrar Sesión</a>`;

  navMenu.appendChild(liUsuario);
  navMenu.appendChild(liCerrarSesion);

  document
    .getElementById("btnCerrarSesionDetalle")
    .addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioLogueado");
      window.location.reload();
    });
}
