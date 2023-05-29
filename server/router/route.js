import { Router } from "express";
const router = Router();
import * as controllers from "../controllers/appcontroller.js";
import Auth,{localVariables} from "../middleware/auth.js";

router.route("/signupin").post(controllers.Signupin);
router.route("/questions").post(Auth,controllers.Questions);

router.route("/generateOTP").get(localVariables,controllers.generateOTP);
router.route("/verifyOTP").get(controllers.verifyOTP);
router.route("/dashboard").get(Auth,controllers.dashboard);

export default router;