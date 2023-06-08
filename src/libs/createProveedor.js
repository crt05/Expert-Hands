import Proveedor from "../models/proveedor.js";

export const createAdminProveedor = async () => {
  const proveedorFound = await Proveedor.findOne({ email: "admin@localhost" });

  if (proveedorFound) return;

  const newProveedor = new Proveedor({
    username: "admin",
    email: "admin@localhost",
  });

  newUser.password = await newUser.encryptPassword("adminpassword");

  const admin = await newUser.save();

  console.log("Admin user created", admin);
};
