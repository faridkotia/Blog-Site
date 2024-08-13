import { verifyUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
// this function is used basicaaly to navigate to the homepage when we are successfully jogged in
import axios from "axios";
// used to call our bakend routes


function Login()
{
    const [user,setUser]=useState({
        email:"",
        password:"",
    });

    //calling an alias of the useNavigate hook
    const navigate = useNavigate()

    function handleChange(e)
    {
        setUser({ ...user , [e.target.name] : e.target.value})
    }

   async function handleSubmit(e)
   {
      e.preventDefault()
      let response= await verifyUser(user)
      if (response) {
        //  if u want to add something to session storage -> sessionStorage.setItem
        //  if u want to get something to session storage -> sessionStorage.getItem
        sessionStorage.setItem("User" , response)
        // in addition to send it to our session storage we will add it to our all future axois request
        axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
        // when we refresh our page it actually wipes the 
        navigate("/home")


      }
      else
      {
        alert("Login failed")
      }
      
    }
    return(
        <form onSubmit={handleSubmit}>
            <label >Email:</label>
            <input type="text" placeholder="Enter email address" required name="email" onChange={handleChange} maxLength={40}/><br />
            <label >Password:</label>
            <input type="password" placeholder="Enter password" required name="password" onChange={handleChange} maxLength={30}/><br />
            <button type="submit" >Login</button>
        </form>
    );
}
export default Login