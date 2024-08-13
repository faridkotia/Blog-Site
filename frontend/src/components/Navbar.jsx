import { Link } from "react-router-dom"
import { pageData } from "./pageData"
//link acts as a button that we click to navigate between the routes that we have made
import { useNavigate } from "react-router-dom";
function Navbar()
{
    const navigate=useNavigate();
    function handleLogout()
    {
        sessionStorage.removeItem("User");
        
        navigate("/")

    }
    return(<div className="navbar">
    {pageData.map((page)=>
    {
        return(
            <Link to={page.path} className="navItem">
                <button>
                    {page.name}
                </button>
            </Link>
        )
    })}
    <button onClick={handleLogout}>Log Out</button>
    </div>);
}
export default Navbar