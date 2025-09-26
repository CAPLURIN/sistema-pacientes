const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{8}$/, // exactamente 8 dígitos (ej: DNI)
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
