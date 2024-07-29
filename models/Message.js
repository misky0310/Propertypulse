import mongoose, { Schema } from "mongoose";
import Email from "next-auth/providers/email";

const messageSchema= new mongoose.Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    property:{
        type:Schema.Types.ObjectId,
        ref:'Property',
        required:true
    },
    name:{
        type:String,
        required:[true,'Please enter your name']
    },
    email:{
        type:String,
        required:[true,'Please enter your email']
    },
    phone:{
        type:String,
    },
    body:{
        type:String,
    },
    read:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Message= mongoose.models.Message || mongoose.model('Message',messageSchema);

export default Message;