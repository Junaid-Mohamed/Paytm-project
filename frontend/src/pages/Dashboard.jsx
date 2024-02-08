import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashoboard = ({username}) =>{
    return(
        <div>
            <Appbar/>
            <div className="m-8">
                <Balance value={"10000"} />  
                <Users username={username}/> 
            </div>
        </div>
    )
}