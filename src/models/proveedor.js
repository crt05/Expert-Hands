import mongoose from "mongoose";

const ProveedorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Proveedor", ProveedorSchema);
