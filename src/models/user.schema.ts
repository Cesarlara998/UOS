import { model, Schema } from "mongoose";

const User: Schema = new Schema({
    
    nickname: {type:String,required:false,unique:true},
    email: {type: String,required:true,unique:true},
    password: {type: String,required:true},

    IsBloqued: {type: Boolean, default: true},
    IsConfirmed: {type: Boolean, default: false},

    CreatedDate: {type: Date, default: new Date()},
    UpdatedDate: {type: Date, default: new Date()},

    CreatedBy: {type:Schema.Types.ObjectId, ref:"User",required:false},
    UpdatedBy: {type:Schema.Types.ObjectId, ref:"User",required:false},

    Role:{type: Schema.Types.ObjectId, ref: 'Role'},
})

const UserSchema = model("User", User);
export default UserSchema