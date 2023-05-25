import mongoose from "mongoose";

const CitaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    fecha: {
        type: date,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    user: {
      type: String,
      required: true,
    },
    proveedor: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", NoteSchema);