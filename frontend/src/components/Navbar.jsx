import { Link } from "react-router-dom";
import { pageData } from "./pageData";
//link acts as a button that we click to navigate between the routes that we have made
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    sessionStorage.removeItem("User");

    navigate("/");
  }
  return (
    <div className="flex flex-col w-screen">
      <NavigationMenu className="bg-primary w-screen p-2">
        <NavigationMenuList>
          {pageData.map((page) => {
            return (
              <NavigationMenuItem>
                <Link to={page.path}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {page.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
        <NavigationMenuLink className={"ml-2 bg-red-500 " + navigationMenuTriggerStyle()} onClick={handleLogout}>Log Out</NavigationMenuLink>
      </NavigationMenu>

    </div>
  );
}
export default Navbar;
