import {RoleSchema} from "../../models/role.schema";

export default class RoleService {
    
    public getDefault = async() => {
        try {
            const Role = await RoleSchema.findOne({isDefault:true});
            if (!Role) throw Error("Rol por defecto no creado");
            return Role;
        } catch (error) {
            throw error
        }
    }

    public GetAll = async () => {
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