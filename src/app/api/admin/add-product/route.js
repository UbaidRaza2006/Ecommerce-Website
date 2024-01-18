import connectToDb from "@/database"
import Product from "@/models/product";
import { data } from "autoprefixer";
import Joi from "joi";
import { NextResponse } from "next/server";


const AddNewProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required()
})



export const dynamic = "force-dynamic"




export async function POST(req) {
    try {
        await connectToDb();

        const user = 'admin'

        if (user === 'admin') {

            const extractData = await req.json();
            const { name,
                price,
                description,
                category,
                sizes,
                deliveryInfo,
                onSale,
                priceDrop,
                imageUrl } = extractData;

            const { error } = AddNewProductSchema.validate({
                name,
                price,
                description,
                category,
                sizes,
                deliveryInfo,
                onSale,
                priceDrop,
                imageUrl
            })

            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }



            const newlyCreatedProduct = await Product.create(extractData)
            if(newlyCreatedProduct){
                return NextResponse.json({
                    success: true,
                    message: "Product added successfully!",
                })
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Failed to add Product. Plz try again! ",
                })
            }




        } else {
            return NextResponse.json({
                success: false,
                message: "You are not Admin!"
            })
        }



    } catch (error) {
        console.log("Error in adding new product-->", error);

        return NextResponse.json({
            success: false,
            message: "Something went Wrong, please Try Again later!"
        })
    }
}