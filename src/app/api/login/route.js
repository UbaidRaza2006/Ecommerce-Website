import connectToDb from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { compare } from "bcrypt"; // Correct import statement
import { NextResponse } from 'next/server'; // Import NextResponse
import jwt from 'jsonwebtoken'










const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const dynamic = "force-dynamic"


export async function POST(req) {

    await connectToDb()

    const { email, password } = await req.json();

    try {

        const checkUser = await User.findOne({ email })

        if (!checkUser) {
            return NextResponse.json({
                success: false,
                message: "Account not found with this email!"
            })

        }

        const checkPassword = await compare(password, checkUser.password)
        if (!checkPassword) {

            return NextResponse.json({
                success: false,
                message: "Incorrect Password!"
            })

        }


        const token = jwt.sign({
            id: checkUser._id,
            email: checkUser?.email,
            role: checkUser?.role
        }, 'default_secret_key', { expiresIn: '1d' })



        const finalData = {
            token,
            user: {
                email: checkUser.email,
                password: checkUser.password,
                _id: checkUser._id,
                role: checkUser.role
            }
        }

        return NextResponse.json({
            success: true,
            message: "Login Successfully",
            finalData
        })

    }
    catch (error) {
        console.log("Error while logging in-->", error);

        return NextResponse.json({
            success: false,
            message: "Something went Wrong, please Try Again later!"
        })

    }


}