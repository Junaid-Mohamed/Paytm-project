import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useNavigate } from "react-router-dom"



export const Dashoboard = () =>{
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [balance,setBalance] = useState(0);
    
    useEffect(()=>{
        axios.post("http://localhost:3000/api/v1/user/authenticate",null,{
           headers:{
               Authorization:`Bearer ${localStorage.getItem("token")}`
           }
       })
       .then(resp=> {
           
           setUsername(resp.data.username);
           setBalance(resp.data.balance);
           // if(resp.)
          navigate('/dashboard');
       }).catch((e)=>{
           if(e.response && e.response.status === 403){
               navigate('/signin')
           }
           else{
               console.log("error",e);
           }
       })
   },[])
    return(
        <div>
            <Appbar username={username}/>
            <div className="m-8">
                <Balance value={balance} />  
                <Users /> 
            </div>
        </div>
    )
}