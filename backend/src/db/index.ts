import mongoose from 'mongoose' ;

export const  userSchema = new mongoose.Schema({
    userId : Number , 
    publicKey : String , 
    privateKey : String ,
} , {timestamps:true})

export const User = mongoose.model('User' , userSchema) ; 