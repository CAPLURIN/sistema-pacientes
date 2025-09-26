// controllers/auth.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================
// Registrar usuario
// ==========================
const register = async (req, res) => {
  try {
    const { usuario, password, rol } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
    }

    if (!/^\d{8}$/.test(usuario)) {
      return res.status(400).json({ error: "El usuario debe ser un número de 8 dígitos" });
    }

    const existingUser = await User.findOne({ usuario });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      usuario,
      password: hashedPassword,
      rol: rol || "user",
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error("Error en register:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ==========================
// Login de usuario
// ==========================
const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
    }

    const user = await User.findOne({ usuario });
    if (!user) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user._id, usuario: user.usuario, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        usuario: user.usuario,
        rol: user.rol,
      },
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// 👇 Esto es lo que probablemente faltaba en tu archivo
module.exports = { register, login };
