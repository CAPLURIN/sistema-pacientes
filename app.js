const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas API
const pacientesRoutes = require("./routes/pacientes.routes");
app.use("/api/pacientes", pacientesRoutes);

// Servir frontend desde /public
app.use(express.static(path.join(__dirname, "public")));

// Ruta catch-all (para que al refrescar no dé error)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Puerto
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});





