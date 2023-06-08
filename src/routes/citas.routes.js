import { Router } from "express";
import {
  renderCitaForm,
  createNewCita,
  renderCitas,
  renderEditForm,
  updateCita, 
  deleteCita,
} from "../controllers/citas.controllers.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// New Note
router.get("/citas/add", isAuthenticated, renderCitaForm);

router.post("/citas/new-cita", isAuthenticated, createNewCita);

// Get All Notes
router.get("/citas", isAuthenticated, renderCitas);

// Edit Notes
router.get("/citas/edit/:id", isAuthenticated, renderEditForm);

router.put("/citas/edit-cita/:id", isAuthenticated, updateCita);

// Delete Notes
router.delete("/citas/delete/:id", isAuthenticated, deleteCita);

export default router;