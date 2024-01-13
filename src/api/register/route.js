import connectToDb from "@/database"
import User from "@/models/user"
import Joi from "joi"



const schema = Joi.object({

    name: Joi.string().required(),
    email: Joi.string().email().required(),
    email: Joi.string().min(6).required(),
    role: Joi.string().required(),


})



export async function POST(req) {

    await connectToDb()

    const { name, email, password, role } = await req.json()


const {error} = schema.validate({name,email,password,role})

if(error){
    return NextResponse.json({
        success: false,
        message:email.details[0]
    })
}

try{

const isUserAlreadyExist= await User.findOne({email});

if(isUserAlreadyExist){

    return NextResponse.json({
        success: false,
        message:"This email already exist, Please try with different email!"
    })

}

else{
    
const hashPassword= await hash(password,12);

const newlyCreatedUser= await User.create({
    name,email,password:hashPassword,role
});

if(newlyCreatedUser){

    return NextResponse.json({
        success: true,
        message:"Account created successfully"
    })
}

}

    
}

catch(error){
    console.log("Error is new user registration");
   
    return NextResponse.json({
        success: false,
        message:"Something went Wrong, please Try Again later!"
    })

}

}