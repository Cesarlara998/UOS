import express from "express";
import userController from "./user.controller";
import Validator from "../../helpers/validator";
import { userCreateDTOSchema } from "./dto/create.dto";
import emailService from "../email/email.service";

export default class UserModule {
    public path = "/master/users"
    public router = express.Router();
    public controller:userController;
    constructor(email: emailService) {
        this.controller = new userController(email);

        this.router.post(`${this.path}`,Validator(userCreateDTOSchema),this.controller.create);

    }
}