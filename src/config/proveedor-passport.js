import passport from "passport-proveedor";
import { Strategy as LocalStrategy } from "passport-local";

import Proveedor from "../models/proveedor.js";

passport.use(
  new LocalStrategy(
    {
      proveedornameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const proveedor = await Proveedor.findOne({ email: email });

      if (!proveedor) {
        return done(null, false, { message: "Proveedor no encontrado." });
      }

      // Match Password's User
      const isMatch = await proveedor.matchPassword(password);
      if (!isMatch)
        return done(null, false, { message: "Contraseña incorrecta." });
      
      return done(null, proveedor);
    }
  )
);

passport.serializeProveedor((proveedor, done) => {
  done(null, proveedor.id);
});

passport.deserializeProveedor((id, done) => {
  Proveedor.findById(id, (err, user) => {
    done(err, proveedor);
  });
});