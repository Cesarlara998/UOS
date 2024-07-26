import { model, Schema } from "mongoose";

const Token: Schema = new Schema({
    
    TokenActive: {type:String},
    User:{type: Schema.Types.ObjectId, ref: 'User'},
    CreatedDate:{type:Date,default:new Date()},
    LimitDate: {type:Date,required:false}
})

const TokenSchema = model("Token", Token);
export default TokenSchema