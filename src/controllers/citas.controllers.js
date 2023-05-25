import Cita from "../models/cita.js";

export const renderCitaForm = (req, res) => res.render("cita/new-cita");

export const createNewCita = async (req, res) => {
  const { titulo, descripcion, fecha,estado, proveedor } = req.body;
  const errors = [];
  if (!titulo) {
    errors.push({ text: "Por favor escriba el titulo." });
  }
  if (!descripcion) {
    errors.push({ text: "Por favor escriba la descripcion del servicio" });
  }
  if (errors.length > 0)
    return res.render("cita/new-cita", {
      errors,
      title,
      description,
      fecha,
      estado,
    });

  const newCita = new Cita({ titulo, descripcion, fecha, estado});
  newCita.user = req.user.id;
  newCita.proveedor = req.proveedor.id;
  await newCita.save();
  req.flash("success_msg", "Cita Agendada correctamente");
  res.redirect("/citas");
};

export const renderCitas = async (req, res) => {
  const citas = await Cita.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
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
  const { title, description, fecha, estado } = req.body;
  await Cita.findByIdAndUpdate(req.params.id, { titulo, descripcion, fecha, estado });
  req.flash("success_msg", "Cita actualizada correctamente");
  res.redirect("/citas");
};

export const deleteCita = async (req, res) => {
  await Cita.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Cita cancelada con exito");
  res.redirect("/citas");
};