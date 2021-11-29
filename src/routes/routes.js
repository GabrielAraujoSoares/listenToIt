import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";

import SessionController from "../app/controllers/SessionController";
import UserController from "../app/controllers/UserController";
import SubmitController from "../app/controllers/SubmitController";
import FileController from "../app/controllers/FileController";
import MusicController from "../app/controllers/MusicController";

import authMiddleware from "../app/middlewares/auth";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/login", UserController.auth);

routes.post("/users", UserController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);

routes.get("/users", UserController.list);

routes.get("/users/get/:id", UserController.get);

// Submit
routes.post("/submits", SubmitController.create);

routes.get("/submits", SubmitController.get);

routes.put("/submits", SubmitController.update);

// Music
routes.get("/musics", MusicController.list);

routes.post("/files", upload.single("file"), FileController.store);

export default routes;
