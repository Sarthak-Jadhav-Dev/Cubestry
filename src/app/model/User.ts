import mongoose , {Schema,Document} from "mongoose"

export interface query extends Document{
    aiKey:string;
    customPrompt:string;
    inbuildPrompt:string
}

export interface User extends Document{
    username:string;
    email:string,
    password:string,
    Questions: query[];
}
const querySchema:Schema<query> = new Schema({
    aiKey:{
        type:String,
        required:true
    },
    customPrompt:{
        type:String,
        required:true
    },
    inbuildPrompt:{
        type:String,
        default:""
    }
})

const UserSchema:Schema<User> = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"Please Enter email"],
        unique:true,
        // match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,"Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter the Password"],
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",UserSchema))


export default UserModel