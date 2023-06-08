import Cita from "../models/cita.js";
import Proveedor from "../models/proveedor.js";

export const renderCitaForm = async (req, res) => {
  const proveedores = await Proveedor.find().populate("user").lean();
  console.log(proveedores);
  res.render("citas/new-cita", {
    proveedores,
  });
};

export const createNewCita = async (req, res) => {
  console.log(req.body);
  const newCita = new Cita(req.body);
  newCita.user = req.user.id;
  // newCita.proveedor = req.proveedor.id;
  await newCita.save();
  req.flash("success_msg", "Cita Agendada correctamente");
  res.redirect("/citas");
};

export const renderCitas = async (req, res) => {
  const citas = await Cita.find({ user: req.user.id })
    .populate({
      path: "proveedor",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .populate("user")
    .sort({ date: "desc" })
    .lean();

  console.log(citas);

  res.render("citas/all-citas", { citas });
};

export const renderEditForm = async (req, res) => {
  const cita = await Cita.findById(req.params.id).lean();
  if (cita.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/citas");
  }
  res.render("citas/edit-cita", { cita });
};

export const updateCita = async (req, res) => {
  const { titulo, descripcion, fecha, estado } = req.body;
  await Cita.findByIdAndUpdate(req.params.id, {
    titulo,
    descripcion,
    fecha,
    estado,
  });
  req.flash("success_msg", "Cita actualizada correctamente");
  res.redirect("/citas");
};

export const deleteCita = async (req, res) => {
  await Cita.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Cita cancelada con exito");
  res.redirect("/citas");
};
