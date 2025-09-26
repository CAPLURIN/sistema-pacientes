const express = require("express");
const router = express.Router();
const {
  obtenerPacientes,
  obtenerPaciente,
  buscarPorDNI,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} = require("../controllers/paciente.controller");

// OJO: el orden importa -> poner /dni/:dni ANTES que /:id
router.get("/", obtenerPacientes);
router.get("/dni/:dni", buscarPorDNI);
router.get("/:id", obtenerPaciente);
router.post("/", crearPaciente);
router.put("/:id", actualizarPaciente);
router.delete("/:id", eliminarPaciente);

module.exports = router;

