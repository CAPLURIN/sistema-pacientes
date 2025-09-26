const Paciente = require("../models/Paciente");

// Obtener todos los pacientes
exports.obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
};

// Obtener paciente por ID
exports.obtenerPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener paciente" });
  }
};

// Buscar por DNI
exports.buscarPorDNI = async (req, res) => {
  try {
    const paciente = await Paciente.findOne({ dni: req.params.dni });
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar paciente por DNI" });
  }
};

// Crear paciente
exports.crearPaciente = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.status(201).json(paciente);
  } catch (error) {
    res.status(400).json({ error: "Error al crear paciente", detalle: error.message });
  }
};

// Actualizar paciente
exports.actualizarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
    res.json(paciente);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar paciente", detalle: error.message });
  }
};

// Eliminar paciente
exports.eliminarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndDelete(req.params.id);
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
    res.json({ msg: "Paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar paciente" });
  }
};




