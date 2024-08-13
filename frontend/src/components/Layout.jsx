import Navbar from "./Navbar"
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

//outlet is some thing we can use with parent route that allow us to render child routes, it allows us to render our navbar in whichever page we want
function Layout()
{
    let user = sessionStorage.getItem("User");
    const navigate = useNavigate()
    useEffect(()=>
    {
        if(!user)
        {
            navigate("/") 
        }
    },[user])
    // this will make sure that when we logout or delete user from session storage we will be redirected to the landing page

    
    return(<>
     <Navbar/>
    <Outlet/>
    </>);
   
}
export default Layout