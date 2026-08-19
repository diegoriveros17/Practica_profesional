// --- 1. GUARDIÁN DE ACCESO: REDIRECCIÓN SI YA INICIÓ SESIÓN ---
const usuarioLogueadoActivo = JSON.parse(
  localStorage.getItem("usuarioLogueado"),
);

if (usuarioLogueadoActivo) {
  window.location.href = "index.html";
}

// --- 2. LÓGICA DE INICIO DE SESIÓN CONECTADA A LA API ---
const formLogin = document.querySelector("#formLogin");
const msjConfirmacion = document.querySelector("#msjConfirmacion");

if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = formLogin.user.value.trim();
    const password = formLogin.password.value;

    try {
      // Petición POST al servidor backend Node.js
      const respuesta = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        // Guardamos la sesión devuelta por Sequelize / Node.js
        localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));

        msjConfirmacion.innerHTML = `
          <div class="row justify-content-center p-3">
            <div class="col">
              <div class="alert alert-success" role="alert">
                ¡Hola ${data.usuario.nombre}! Redirigiendo a la página de inicio...
              </div>
            </div>
          </div>`;

        const contenedor = document.getElementById("page-container");
        if (contenedor) contenedor.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        // Muestra error si las credenciales son incorrectas
        msjConfirmacion.innerHTML = `
          <div class="row justify-content-center p-3">
            <div class="col">
              <div class="alert alert-danger" role="alert">
                ${data.mensaje || "Usuario o contraseña incorrectos"}
              </div>
            </div>
          </div>`;
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      msjConfirmacion.innerHTML = `
        <div class="row justify-content-center p-3">
          <div class="col">
            <div class="alert alert-danger" role="alert">
              No se pudo conectar con el servidor backend.
            </div>
          </div>
        </div>`;
    }
  });
}

// --- 3. MANEJO DINÁMICO DE SELECCIÓN DE ROL EN EL REGISTRO ---
const btnCiudadano = document.getElementById("btnRolCiudadano");
const btnRepresentante = document.getElementById("btnRolRepresentante");
const inputOcultoRol = document.getElementById("regRol");

const camposFormulario = document.getElementById("camposFormulario");
const camposCiudadano = document.getElementById("camposCiudadano");
const camposInstitucion = document.getElementById("camposInstitucion");

function seleccionarRol(rol) {
  if (!inputOcultoRol || !camposFormulario) return;

  inputOcultoRol.value = rol;
  camposFormulario.classList.remove("d-none");

  document.getElementById("nombre").required = true;
  document.getElementById("apellido").required = true;
  document.getElementById("email").required = true;
  document.getElementById("password").required = true;

  if (rol === "ciudadano") {
    btnCiudadano?.classList.replace("btn-outline-secondary", "btn-primary");
    btnCiudadano?.classList.add("text-white");
    btnRepresentante?.classList.replace("btn-primary", "btn-outline-secondary");
    btnRepresentante?.classList.remove("text-white");

    camposCiudadano?.classList.remove("d-none");
    camposInstitucion?.classList.add("d-none");

    if (document.getElementById("dni"))
      document.getElementById("dni").required = true;
    if (document.getElementById("address"))
      document.getElementById("address").required = true;
    if (document.getElementById("institucionNombre"))
      document.getElementById("institucionNombre").required = false;
    if (document.getElementById("cuit"))
      document.getElementById("cuit").required = false;
  } else if (rol === "representante") {
    btnRepresentante?.classList.replace("btn-outline-secondary", "btn-primary");
    btnRepresentante?.classList.add("text-white");
    btnCiudadano?.classList.replace("btn-primary", "btn-outline-secondary");
    btnCiudadano?.classList.remove("text-white");

    camposInstitucion?.classList.remove("d-none");
    camposCiudadano?.classList.add("d-none");

    if (document.getElementById("institucionNombre"))
      document.getElementById("institucionNombre").required = true;
    if (document.getElementById("cuit"))
      document.getElementById("cuit").required = true;
    if (document.getElementById("dni"))
      document.getElementById("dni").required = false;
    if (document.getElementById("address"))
      document.getElementById("address").required = false;
  }
}

if (btnCiudadano && btnRepresentante) {
  btnCiudadano.addEventListener("click", () => seleccionarRol("ciudadano"));
  btnRepresentante.addEventListener("click", () =>
    seleccionarRol("representante"),
  );
}

// --- 4. LÓGICA DE REGISTRO ---
const formRegistro = document.querySelector("#formRegistro");
const msjRegistro = document.querySelector("#msjRegistro");

if (formRegistro) {
  formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Capturamos el rol guardado en el input oculto por los botones
    const inputRol = document.getElementById("regRol");
    const rolElegido = inputRol ? inputRol.value : "";

    // Validación rápida antes de enviar al backend
    if (!rolElegido) {
      msjRegistro.innerHTML = `
        <div class="alert alert-warning mt-2">
          Por favor, selecciona si eres "Ciudadano" o "Representante de Institución" arriba.
        </div>`;
      return;
    }

    // 2. Construimos el objeto exacto que espera tu controlador
    const datosRegistro = {
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      rol: rolElegido, // <-- Se envía 'ciudadano' o 'representante'
      dni: document.getElementById("dni")
        ? document.getElementById("dni").value.trim()
        : null,
      direccion: document.getElementById("address")
        ? document.getElementById("address").value.trim()
        : null,
    };

    try {
      const respuesta = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosRegistro),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        msjRegistro.innerHTML = `
          <div class="alert alert-success mt-2">
            ¡Registro completado con éxito! Redirigiendo...
          </div>`;
        formRegistro.reset();

        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        // Mostramos el mensaje exacto que nos envía el backend
        msjRegistro.innerHTML = `
          <div class="alert alert-danger mt-2">${data.mensaje}</div>`;
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      msjRegistro.innerHTML = `
        <div class="alert alert-danger mt-2">
          No se pudo conectar con el servidor backend.
        </div>`;
    }
  });
}
