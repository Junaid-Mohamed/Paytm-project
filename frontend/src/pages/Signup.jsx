import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";

export const Signup = ()=>{

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");


    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onChange={(e)=>setFirstName(e.target.value)} type={"text"} value={firstName} placeholder={"Will"} label={"First Name"}/>
                <InputBox onChange={(e)=>setLastName(e.target.value)} type={"text"} value={lastName} placeholder={"Smith"} label={"Last Name"}/>
                <InputBox onChange={(e)=>setUsername(e.target.value)} type={"text"} value={username} placeholder={"username"} label={"Username"}/>
                <InputBox onChange={(e)=>setPassword(e.target.value)} type={"password"} value={password} placeholder={"*******"} label={"Password"}/>
               <div className="pt-4">
                    <Button onClick={async()=>{
                       const resp =  await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        })
                        // after getting the token you should store it.
                        // use local storage and use this for persistent login.
                        console.log(resp)
                        localStorage.setItem("token",resp.data.token);
                        alert(resp.data.message);
                        setFirstName("");
                        setLastName("");
                        setPassword("");
                        setUsername("");

                    }} label={"Sign up"}/>
               </div>
               <BottomWarning label={"Already have an account? "} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
            
               
           
            
        </div>
    )
}