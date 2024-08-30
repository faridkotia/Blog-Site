import { createUser } from "../api";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


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
        <form onSubmit={handleSubmit} className="flex flex-col">
            
            <Input type="text" placeholder="Enter name" required name="name" onChange={handleChange} maxLength={20} className="mb-2"/>
            
            <Input type="text" placeholder="Enter email address" required name="email" onChange={handleChange} maxLength={40}className="mb-2"/>
            
            <Input type="password" placeholder="Enter password" required name="password" onChange={handleChange} maxLength={30}className="mb-2"/>
            <Button type="submit" className="mb-2">Create Account</Button>
        </form>
    );
}
export default CreateUser