import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Landing()
{
    // view == 0 => login mode
    // view == 1 => create Account 
    const [view,setView] = useState(0)
    function change()
    {
        setView(!view);
    }


    return(
    <div className="flex justify-center items-center w-screen h-screen">
         {!view ? 
        <div className="flex flex-col w-96">
            <Login/> 
            <Button onClick={change}>Create new Account</Button>
        </div>

        :

            <div className="flex flex-col w-96">
            <CreateUser/>
            <Button onClick={change}>Login Existing User</Button>
            </div>
        }
    
    </div>);
}
export default Landing