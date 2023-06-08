import { Router } from "express";
import {
  renderSignUpForm,
  signup,
  renderSigninForm,
  signin,
  logout,
} from "../controllers/proveedor.controllers.js";

const router = Router();

// Routes
router.get("/proveedor/signup", renderSignUpForm);

router.post("/proveedor/signup", signup);

router.get("/proveedor/signin", renderSigninForm);

router.post("/proveedor/signin", signin);

router.get("/proveedor/logout", logout);

export default router;