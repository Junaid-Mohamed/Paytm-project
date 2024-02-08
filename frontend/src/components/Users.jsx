import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";


export const Users = () =>{

    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    const [isEmpty,setIsEmpty] = useState(false);
    // should add debouncing for filter
    {console.log(filter)}
    let timeout;
    const debouncedPopulateUser=()=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            populateUsers();
        },100);
    }

    const populateUsers = ()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then(resp=>{
            setUsers(resp.data.user)
            })
    }

   
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then(resp=>{
            setUsers(resp.data.user)
            })
       
    },[isEmpty])

    return(<>     
       <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." onChange={(e)=>{
                const inputValue = e.target.value;
                setFilter(inputValue);
                if(inputValue.trim() ===""){
                   setIsEmpty(true);
                } 
                else debouncedPopulateUser();
            }}
            className="w-full px-2 py-2 border rounded border-slate-300"/>
        </div>
        <div>
            {users.map(user=><User key={user._id} user={user}/>)}
        </div>
        </>

    )
}


const User = ({user})=>{
    const navigate = useNavigate();
    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>

                </div>
            </div>
            {/* Navigate or link anthing can be used */}
            <div className="flex flex-col justify-center h-full">
                <Button onClick={(e)=>{
                    navigate(`/sendmoney?id=${user._id}&name=${user.firstName}`)
                }} label={"Send Money"} />
            </div>
        </div>
    )

}

// should add logic in backend that you don't see the user who is signed in.
// frontend filetring you can do, but in real world you don't return all the users, to FE,
//  you return less items from BE, and have pagination p1,p2 like that.
