import Navbar from "./Navbar"
import { Outlet } from "react-router-dom";

//outlet is some thing we can use with parewnt route that allow us to render child routes, it allows us to render our nav bar in whiever page we want
function Layout()
{
    return(<>
     <Navbar/>
    <Outlet/>
    </>);
   
}
export default Layout