import { Request, Response, NextFunction } from "express";
import { userCreateDTOI } from "./dto/create.dto";
import emailService from "../email/email.service";
import userService from "./user.service";
import RoleService from "../role/role.service";
import bcrypt from 'bcrypt';
import TokenService from "../token/token.service";
export default class userController {

    private emailService: emailService;
    private userService: userService;
    private roleService: RoleService;
    private tokenService: TokenService;
    constructor(emailService: emailService) {
        this.emailService = emailService;
        this.userService = new userService();
        this.roleService = new RoleService();
        this.tokenService = new TokenService();
    }

    public create = async (request: Request, response: Response, next: NextFunction) => {
        try {
            let input:userCreateDTOI = request.body;
            const findUser =  await this.userService.findUser(input.email,input.nickname); 
            
            if (findUser) throw new Error("Email ya registrado");
            const role = await this.roleService.getDefault();
            input.password = await this.Encrypt(input.password);
            const user = await this.userService.create(input,role.id);
            
            this.tokenService.Update(user.id,user.toJSON());
            return response.success(user,"User creado correctamente");

        } catch (error) {
            return next(error)
        }
    }



    private Encrypt = async (phrase: string): Promise<string> => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(phrase, salt);
            return hash;
        } catch (err) {
            throw new Error("Encryption Error: " + err);
        }
    }

}