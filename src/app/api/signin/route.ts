import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/User";
import bcrypt from "bcrypt"

export async function POST(request:Request){
    await dbConnect();
    try{
        const{username,email,password} = await request.json();
        const ExistingUser = await UserModel.findOne({username});

        if(ExistingUser){
            return Response.json(
                {
                    success:false,
                    messege:"User Already Exists"
                },{
                    status:400,
                }
            )
        }
        const ExistingUserbyMail = await UserModel.findOne({email});
        if(ExistingUserbyMail){
            return Response.json({
                success:false,
                messege:"Email Already Registered"
            },{
                status:400,
            })
        }else{
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = new UserModel({
                username,
                email,
                password:hashedPassword
            })
            await newUser.save();
            return Response.json({
                success:true,
                messege:"User Registered Successfully"
            },{
                status:201,
            })
        }
    }catch(error){
        console.error(error)
        return Response.json(
            {
                success:false,
                messege:"Error while Signing in"
            },{
                status:500,
            }
        )
    }
}