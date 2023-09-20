import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true,"Enter the name"]
    },
    email:{
        type : String,
        required : [true,"Enter the name"]
    },
    password:{
        type : String,
        required : [true,"Enter the name"]
    }
})

export default mongoose.model("user",userSchema);