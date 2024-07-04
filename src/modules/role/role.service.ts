import {RoleSchema} from "../../models/role.schema";

export default class RoleService {

    public GetAll = async (name: string) => {
        try {
            return await RoleSchema.find();
        } catch (error) {
            throw error
        }
    }

    public Insert = async (name: string) => {
        try {
            const existingRole = await RoleSchema.findOne({ name: name });
            if (existingRole) throw Error("Rol ya existente")
            
             const newObject = new RoleSchema({name:name});
             await newObject.save();
             return newObject;
            
        } catch (error) {
            throw error           
        }
    }
}