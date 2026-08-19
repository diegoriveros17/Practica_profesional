import { UsuarioModel, PersonaModel, RolModel } from "../models/index.js";

// --- LOGIN ---
export const login = async (req, res) => {
  try {
    const { user, password } = req.body;

    // Buscamos usuario por Email o DNI, e incluimos Persona y Rol
    const usuario = await UsuarioModel.findOne({
      where: { email: user }, // Si querés buscar también por DNI, podés usar Op.or
      include: [
        { model: PersonaModel, as: "persona" },
        { model: RolModel, as: "rol" },
      ],
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Validación simple de clave (luego le podés sumar bcrypt)
    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Respuesta exitosa para el frontend
    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.persona.nombre,
        apellido: usuario.persona.apellido,
        email: usuario.email,
        rol: usuario.rol.nombre,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// --- REGISTRO ---
export const register = async (req, res) => {
  try {
    const { nombre, apellido, dni, direccion, email, password, rol } = req.body;

    // 1. Validar si el email ya existe
    const usuarioExistente = await UsuarioModel.findOne({ where: { email } });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "El correo electrónico ya está registrado." });
    }

    // 2. Buscar el ID del rol seleccionado ('ciudadano' o 'representante')
    const rolEncontrado = await RolModel.findOne({ where: { nombre: rol } });
    if (!rolEncontrado) {
      return res
        .status(400)
        .json({ mensaje: "El rol especificado no es válido." });
    }

    // 3. Crear la Persona en la BD
    const nuevaPersona = await PersonaModel.create({
      nombre,
      apellido,
      dni: dni || null,
      direccion: direccion || null,
    });

    // 4. Crear el Usuario vinculado a la Persona y al Rol
    const nuevoUsuario = await UsuarioModel.create({
      email,
      password, // Idealmente más adelante le aplicás bcrypt para encriptar
      persona_id: nuevaPersona.id,
      rol_id: rolEncontrado.id,
    });

    return res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
        nombre: nuevaPersona.nombre,
        apellido: nuevaPersona.apellido,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    return res
      .status(500)
      .json({ mensaje: "Error al registrar el usuario en la base de datos." });
  }
};
