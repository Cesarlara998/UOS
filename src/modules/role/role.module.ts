import express from "express";
import RoleController from "./role.controller";

export default class RoleModule {
    public path = "/master/role"
    public router = express.Router();
    public controller = new RoleController;
    constructor() {
        
        this.router.get(`${this.path}`,this.controller.getAll);
        this.router.post(`${this.path}`,this.controller.create);

    }
}