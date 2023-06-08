import User from "../models/User.js";
import Proveedor from "../models/proveedor.js";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("auth/signup");

export const signup = async (req, res) => {
  try {
    let errors = [];
    console.log(req.body);
    const { name, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      errors.push({ text: "Passwords do not match." });
    }

    if (password.length < 4) {
      errors.push({ text: "Passwords must be at least 4 characters." });
    }

    if (errors.length > 0) {
      return res.render("auth/signup", {
        errors,
        name,
        email,
        password,
        confirm_password,
      });
    }

    // Look for email coincidence
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      req.flash("error_msg", "The Email is already in use.");
      return res.redirect("/auth/signup");
    }

    // Saving a New User
    const newUser = new User({ name, email, password });

    if (req.body.type === "proveedor") {
      const newProveedor = new Proveedor({ user: newUser._id });
      await newProveedor.save();
    }

    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();

    req.flash("success_msg", "You are registered.");
    res.redirect("/auth/signin");
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      req.flash("error_msg", "The Email is already in use.");
      return res.redirect("/auth/signup");
    }

    req.flash("error_msg", "Error, try again later.");
    res.redirect("/auth/signup");
  }
};

export const renderSigninForm = (req, res) => res.render("auth/signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/citas",
  failureRedirect: "/auth/signin",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "You are logged out now.");
    res.redirect("/auth/signin");
  });
};
