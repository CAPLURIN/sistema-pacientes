const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true, trim: true },
  nombre: { type: String, required: true, trim: true },
  edad: { type: Number, required: true },
  telefono: {
    type: String,
    required: true,
    match: [/^\d{9}$/, "El teléfono debe tener exactamente 9 dígitos"],
  },
  servicio: {
    type: String,
    enum: ["Odontología", "Enfermería", "Ginecología", "Medicina"],
    required: true,
  },
  actividad: { type: String, required: true, trim: true },
  accion: { type: String, required: true, trim: true },
  direccion: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Paciente", pacienteSchema);

