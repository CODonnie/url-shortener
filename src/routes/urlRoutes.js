import express from "express";
import { redirectUrl } from "../controllers/redirectController.js"

const urlRouter = express.Router();

urlRouter.get("/:shortId", redirectUrl);

export default urlRouter;
