import express from "express";
import * as AuthController from "../controller";

const authRouter = express.Router();

authRouter.route("/sign").post(AuthController.sign);

export default authRouter;