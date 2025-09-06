import mongoose from "mongoose";

type connectionObject = {
    isConnected:number
}
const connection:connectionObject = {isConnected:0}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected")
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGO_URI as string || "mongodb+srv://sarthakjadhav4848:iLfs5neYBFkewsQg@cluster0.fkmzg9k.mongodb.net/?retryWrites=true&w=majority");
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB")
    }catch(err){
        console.log("Error in DB Connection",err)
        process.exit(1);
    }
}

export default dbConnect;