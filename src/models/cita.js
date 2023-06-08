import mongoose from "mongoose";

const CitaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    proveedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proveedor",
    },
    detalles: {
      type: String,
      required: true,
    },
    fecha: {
      type: "date",
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cita", CitaSchema);
