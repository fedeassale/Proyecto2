import { Router } from "express";
import { FormController } from "../controllers/form.controller.js";


const router = Router(); 

router.get("/data", FormController.getForms);
router.post("/submit", FormController.submitForm);
router.put("/update/:id", FormController.updateForm);
router.delete("/delete/:id", FormController.deleteForm);


export default router;