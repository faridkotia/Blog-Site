import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import { useState } from "react";
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
    <>
         {!view ? 
            <>
            <Login/> 
            <button onClick={change}>Create new Account</button>
        </>

        :

            <>
            <CreateUser/>
            <button onClick={change}>Login Existing User</button>
            </>
        }
    
    </>);
}
export default Landing