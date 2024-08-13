import { createUser } from "../api";
import { useState } from "react";


function CreateUser()
{
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    });

    function handleChange(e)
    {
        setUser({ ...user , [e.target.name]:e.target.value})
    }

   async function handleSubmit(e)
    {
      e.preventDefault()
      let response= await createUser(user)
      if (response.status !==200)
      {
        alert('User account cound not be created')
        
      }
    }
    return(
        <form onSubmit={handleSubmit}>
            <label >Name:</label>
            <input type="text" placeholder="Enter name" required name="name" onChange={handleChange} maxLength={20} /><br />
            <label >Email:</label>
            <input type="text" placeholder="Enter email address" required name="email" onChange={handleChange} maxLength={40}/><br />
            <label >Password:</label>
            <input type="password" placeholder="Enter password" required name="password" onChange={handleChange} maxLength={30}/><br />
            <button type="submit" >Create Account</button>
        </form>
    );
}
export default CreateUser