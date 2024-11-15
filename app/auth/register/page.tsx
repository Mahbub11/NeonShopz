import { RegisterForm } from "@/components/auth/register-form";


export default function Login(){


    return (
        <div className="w-[90%] md:w-[40%] mx-auto mt-5 md:mt-10">
            <h1 className="text-2xl text-center">Register</h1>
           <RegisterForm></RegisterForm>
        </div>
    )
}