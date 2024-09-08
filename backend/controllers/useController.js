import UserModel from "../models/User.js"
import { body,validationResult } from "express-validator"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
const jwtSecret = "MynameisAnupPrajapatiAnupAnup333"

class useController{
    static create_user=async(req,res)=>{
        const salt = await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(req.body.password,salt)
        try{
            const result=new UserModel({
                name:req.body.name,
                password:secPassword,
                email:req.body.email,
                location:req.body.location
            })
            await result.save()
            res.json({success:true})
        }catch(err){   
            console.log(err)
        }
    }

    static login_user=async(req,res)=>{
        let email=req.body.email
        try{
            let userData=await UserModel.findOne({email});
            if(!userData){
                return res.status(400).json({errors:"Try loggin with correct credentials"})
            }
            const isMatch = await bcrypt.compare(req.body.password,userData.password)
            if(!isMatch){
                return res.status(400).json({errors:"Try login with correct credentials"})
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)
            return res.json({success:true,authToken:authToken})

        }catch(err){
            console.log(err)
            res.json({success:false})
        }
    }
    static DisplayData=async(req,res)=>{
        try{
            res.send([global.fooditems,global.foodcategory])
        }catch(err){
            console.log(err)
        }
    }
}

export default useController