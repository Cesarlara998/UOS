import UserSchema from "../../models/user.schema";
import { userCreateDTOI } from "./dto/create.dto";

export default class userService {
    
    constructor() {}

    public findUser = async (email: string, nickname: string) => {
        return await UserSchema.findOne({
            $or: [
                { email: email },
                { nickname: nickname }
            ]
        });
    };

    public create = async(input:userCreateDTOI,Role:string)  =>{
        try {
            const user = new UserSchema({...input,Role:Role});
            user.save();
            return user;
        } catch (error) {
            throw error
        }
    }
}