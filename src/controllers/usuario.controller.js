import { PersonaModel, UsuarioModel } from "../models/index.js";

// Registrar un nuevo Ciudadano (Persona + Usuario)
export const registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      dni,
      email_login,
      password,
      acepta_notificaciones,
    } = req.body;

    const nuevoUsuario = await UsuarioModel.create(
      {
        email,
        password: password,
        acepta_notificaciones,
        rol_id: 1, // Rol 1 = 'ciudadano'
        persona: {
          nombre,
          apellido,
          dni,
        },
      },
      {
        include: [{ model: PersonaModel, as: "persona" }],
      },
    );

    res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuarioId: nuevoUsuario.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar el usuario",
      error: error.message,
    });
  }
};

// Iniciar Sesión (Login)
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await UsuarioModel.findOne({
      where: { email },
      include: [{ model: PersonaModel, as: "persona" }],
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: "El usuario no existe" });
    }

    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    res.json({
      mensaje: "Login exitoso",
      usuario: {
        id: usuario.id,
        email: usuario.email_login,
        nombre: usuario.persona.nombre,
        apellido: usuario.persona.apellido,
        dni: usuario.persona.dni,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};
