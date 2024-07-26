import TokenSchema from "../../models/token.schema";
import jwt from 'jsonwebtoken';

export default class TokenService {
    private key:string;
    constructor(){
        this.key = "USR0s"
    }
    public getTokenUser = async(user:string) => {
        try {
            const token = await TokenSchema.findOne({User:user});
            if (!token) {
                return new TokenSchema({TokenActive: '',User:user}).save();
                
            }
            return token;
        } catch (error) {
            throw error
        }
    }

    public Update = async (user: string,payload:any) => {
        try {
            delete payload.password;
            const token = jwt.sign(payload, this.key, { expiresIn: '5h' });

            const now = new Date();
            const fiveHoursLater = new Date(now.getTime() + 5 * 60 * 60 * 1000); // Agrega 5 horas en milisegundos
            
            const usrToken = await this.getTokenUser(user);
            
            usrToken.User = user;
            usrToken.TokenActive = token;
            usrToken.CreatedDate = now;
            usrToken.LimitDate = fiveHoursLater;
             await usrToken.save();
             
            
        } catch (error) {
            throw error           
        }
    }

}