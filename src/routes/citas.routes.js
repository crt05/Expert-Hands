import { Router } from "express";
import {
  renderCitaForm,
  createNewCita,
  renderCitas,
  renderEditForm,
  updateCitas, 
  deleteCita,
} from "../controllers/citas.controllers.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

// New Note
router.get("/citas/add", isAuthenticated, renderNoteForm);

router.post("/citas/new-cita", isAuthenticated, createNewNote);

export default router;