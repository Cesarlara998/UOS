
import { FastifyReply, FastifyRequest } from "fastify";
import {RoleSchema} from "../../models/role.schema";
import RoleService from "./role.service";
import nameSchema, { NameSchema } from "./dto/add";
import { Request, Response, NextFunction } from "express";

export default class RoleController {

    private Service: RoleService 
    constructor() {
        this.Service = new RoleService();
    }

    public getAll = async (request: Request, response: Response, next: NextFunction) => {
        
        const roles = await RoleSchema.find();
        return response.success(roles,"Roles encontrados correctamente");
    }
    
    public create = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { name } = request.body;
            const role = await this.Service.Insert(name)
            return response.success(role,"rol creado correctamente")
        } catch (error) {
            return next(error)
        }
    }
}