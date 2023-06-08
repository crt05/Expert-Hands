import Proveedor from "../models/proveedor.js";
import passport from "passport"

export const renderSignUpForm = (req, res) => res.render("proveedor/signup");

export const signup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Las contraseña no coinside." });
  }

  if (password.length < 4) {
    errors.push({ text: "La contraseña debe de tener mas de 4 caracteres." });
  }

  if (errors.length > 0) {
    return res.render("proveedor/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  }

  // Look for email coincidence
  const ProveedorFound = await Proveedor.findOne({ email: email });
  if (ProveedorFound) {
    req.flash("error_msg", "Ya existe esta cuenta de correo.");
    return res.redirect("/proveedor/signup");
  }

  // Saving a New User
  const newProveedor = new Proveedor({ name, email, password });
  newProveedor.password = await newProveedor.encryptPassword(password);
  await newProveedor.save();
  req.flash("success_msg", "Registro exitoso.");
  res.redirect("/proveedor/signin");
};

export const renderSigninForm = (req, res) => res.render("proveedor/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/proveedor/signin",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Sesión finalizada exitosamente.");
    res.redirect("/proveedor/signin");
  });
};