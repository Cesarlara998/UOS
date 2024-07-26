import { model, Schema } from "mongoose";

const Role: Schema = new Schema({
    name: {type:String,required:false},
    isDefault: {type:Boolean,required:false,default: false},
    CreatedDate: {type: Date, default: new Date()},
    UpdatedDate: {type: Date, default: new Date()},
    CreatedBy: {type:Schema.Types.ObjectId, ref:"User",required:false   },
    UpdatedBy: {type:Schema.Types.ObjectId, ref:"User",required:false}
})
const RoleSchema = model("Role", Role);
export {RoleSchema}