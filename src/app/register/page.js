'use client'

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import { registerNewUser } from "@/services/register"
import { registrationFormControls } from "@/utils"
import { useState } from "react"

const isRegistered = false

const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 'customer'
}

export default function Register() {

    const [formData, setFormData] = useState(initialFormData)

     console.log("formData-->",formData);

     function isFormValid(){
        return formData && formData.name && formData.name.trim() !== '' && formData && formData.email && formData.email.trim() !== '' && formData && formData.password && formData.password.trim() !== '' ?true: false
     }

async function handleRegisterOnSubmit(){

    const data= await registerNewUser(formData)
    console.log(data);
    
} 



    return (
        <div className=" bg-white relative">

            <div className="flex flex-col justify-between items-center pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center w-full items-center pr-10 pl-10 lg:flex-row">
                    <div className="max-w-2xl w-full relative mt-10 mr-0 mb-0 ml-0  lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-serif text-center font-medium">

                                {
                                    isRegistered ? "Registration Successfull !" : "Signup for an account"
                                }
                            </p>
                            {
                                isRegistered ?
                                    (<button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tarcking-wide">Login</button>) : (
                                        <div className="relative space-y-8 w-full mt-6 mr-0 mb-0 ml-0">
                                            {
                                                registrationFormControls.map((controlItem) => controlItem.componentType === "input" ? (
                                                    <InputComponent
                                                        type={controlItem.type}
                                                        label={controlItem.label}
                                                        placeholder={controlItem.placeholder}
                                                        onChange={(event)=>{
                                                            setFormData({
                                                                ...formData,
                                                                [controlItem.id]: event.target.value
                                                            })
                                                        }}
                                                        value={formData[controlItem.id]}
                                                    />
                                                ) : controlItem.componentType === "select" ? (
                                                    <SelectComponent
                                                        options={controlItem.options}
                                                        label={controlItem.label}
                                                        onChange={(event)=>{
                                                            setFormData({
                                                                ...formData,
                                                                [controlItem.id]: event.target.value
                                                            })
                                                        }}
                                                        value={formData[controlItem.id]} />
                                                ) : null
                                                )
                                            }
                                            <button className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tarcking-wide"
                                            disabled={!isFormValid()}
                                            onClick={handleRegisterOnSubmit}
                                            >Register</button>
                                        </div>
                                    )
                            }



                        </div>
                    </div>
                </div>
            </div>

        </div>)
}