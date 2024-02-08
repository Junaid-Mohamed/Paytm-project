import axios from "axios";
import { useEffect, useState } from "react"

import { Dashoboard } from "./Dashboard";
import { useNavigate } from "react-router-dom";


export const Home = () =>{
    
    const navigate = useNavigate();
    const [user,setUser]=useState("");

    // in useEffect you can't write an async function, so .then syntax you have to follow.
    useEffect(()=>{
         axios.post("http://localhost:3000/api/v1/user/loggedin",null,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(resp=> {
            console.log(resp);
            resp.status === 200?console.log("yes"):console.log("no")
        }).catch((e)=>console.log(e))
    },[])

    return(
     <></>
    )
}

