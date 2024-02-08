import axios from "axios";
import { useEffect, useState } from "react"

import { Dashoboard } from "./Dashboard";
import { useNavigate } from "react-router-dom";


export const Home = () =>{
    
    const navigate = useNavigate();
    const [user,setUser]=useState("");

    // in useEffect you can't write an async function, so .then syntax you have to follow.
    useEffect(()=>{
         axios.post("http://localhost:3000/api/v1/user/authenticate",null,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(resp=> {
            console.log(resp);
            // if(resp.)
           navigate('/dashboard');
        }).catch((e)=>{
            if(e.response.status === 403){
                console.log("Access forbidden");
                navigate('/signin')
            }
            else{
                console.log("error",e);
            }
        })
    },[])
    // If the request returns a 403 status code, the .then() block won't be executed. 
    // Instead, the code will flow directly to the .catch() block, where you can 
    // handle the 403 error or any other errors that may occur during the request.
    return(
     <><div>Home page.</div></>
    )
}

