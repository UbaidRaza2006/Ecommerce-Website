'use client'

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import { GlobalContext } from "@/context"
import { login } from "@/services/login"

import { loginFormControls } from "@/utils"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie';



const initialFormdata = {
    email: '',
    password: ''
}


export default function Login() {

    const [formData, setFormData] = useState(initialFormdata)

    const{user, setUser, isAuthUser, setIsAuthUser}=useContext(GlobalContext)

    const router = useRouter()

    console.log(formData);


    function isFormValid() {
        return formData && formData.email && formData.email.trim() !== '' && formData && formData.password && formData.password.trim() !== '' ? true : false
    }

    async function handleLogin(){

        const res = await login(formData)
        console.log(res);

        if(res.success){
setIsAuthUser(true);
setUser(res?.finalData?.user);
setFormData(initialFormdata);
Cookies.set("token",res?.finalData?.token);
localStorage.setItem("user",JSON.stringify(res?.finalData?.user))
        }else{
            setIsAuthUser(false)
        }
    } 


    useEffect(()=>{
        if(isAuthUser){
            router.push("/")
        }
    },[isAuthUser])

    console.log(isAuthUser,user);

    return (<div className=" bg-white relative">

        <div className="flex flex-col justify-between items-center pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
            <div className="flex flex-col justify-center w-full items-center pr-10 pl-10 lg:flex-row">
                <div className="max-w-2xl w-full relative mt-10 mr-0 mb-0 ml-0  lg:mt-0 lg:w-5/12">
                    <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                        <p className="w-full text-4xl font-serif text-center font-medium">

                            Login
                        </p>

                        <div className="relative space-y-8 w-full mt-6 mr-0 mb-0 ml-0">
                            {
                                loginFormControls.map((controlItem) => controlItem.componentType === "input" ? (
                                    <InputComponent
                                        type={controlItem.type}
                                        label={controlItem.label}
                                        placeholder={controlItem.placeholder}
                                        value={formData[controlItem.id]}
                                        onChange={(event) => {
                                            setFormData({
                                                ...formData,
                                                [controlItem.id]: event.target.value
                                            })
                                        }}
                                    />
                                ) : controlItem.componentType === "select" ? (
                                    <SelectComponent
                                        options={controlItem.options}
                                        label={controlItem.label} />
                                ) : null
                                )
                            }
                            <button className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tarcking-wide"
                                disabled={!isFormValid()}
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                            
                            
                            <div className="flex flex-col gap-2">
                                <p>New to Website?</p>
                                <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tarcking-wide"
                                    onClick={() => router.push("/register")}
                                >Register</button>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>

    </div>)
}