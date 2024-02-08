import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export const Signin = () =>{
    const [username,setUsername] = useState("");
    const [password,setpassword] = useState("");
    const navigate = useNavigate();
    return(
        <div className="bg-slate-300 h-screen flex justify-center"> 
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your credentails to login to your account"}/>
                    <InputBox placeholder={"Username"} onChange={(e)=>{setUsername(e.target.value)}} value={username}  label={"username"} type={"text"}  />
                    <InputBox placeholder={"******"} onChange={(e)=>{setpassword(e.target.value)}} value={password} label={"Password"} type={"password"} />
                    <div className="pt-4">
                        <Button
                        onClick={async()=>{
                            const resp = await axios.post("http://localhost:3000/api/v1/user/signin",{
                                username,
                                password
                            })
                            localStorage.setItem("token",resp.data.token);
                            setUsername("");
                            setpassword("");
                            navigate('/');
                        }}
                        label={"Sign in"}/>
                    </div>
                    <BottomWarning label={"Don't have an account ?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}