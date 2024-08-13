import { Link } from "react-router-dom"
import { pageData } from "./pageData"
//link acts as a button that we click to navigate between the routes that we have made
function Navbar()
{
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
    </div>);
}
export default Navbar