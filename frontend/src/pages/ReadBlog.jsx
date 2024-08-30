import { getPost } from "../api";
import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
// this react hook called useParams will actully help us in grabbing the id in the url(which is provided by mango db)
import { getImage } from "../api";
function ReadBlog()
{
    const [post,setPost]=useState({});
    let params = useParams()
    const navigate= useNavigate()
    // this actually return an object where each param is the property of that object 
    // in this code what happens actually is tha whenever we click on any post we are take to the read blog page 
    // them the id from the url is extracted and then the the data variable is set to the post corresponding to that id
    // so we can use it to display it on the readblog page
    let id = params.id
    useEffect(()=>
    {
        async function loadPost()
        {
            let data = await getPost(id)
            let date = new Date(data.dateCreated)
            data.dateCreated = date.toString()
            console.log(data)
            setPost(data);
        }
        loadPost()
    },[])
// useNavigate is kind of link that allows us to traverse between pages except use navigate is used within js code not jsx
    
    return(<div className="flex flex-col w-1/3 items-center">
    <Button className="w-48 m-4" onClick={()=>{
        //useNavigate(-1) // useNavigate will take you back on page but we cannot use react hooks as the are so we need to create the alias of them
        navigate(-1);
        }}>Return</Button>

    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">{post.title}</h1>
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">{post.description}</h2>
    <div className="flex w-full justify-center">
    <img src={post.image?.data} alt="Image" className="max-h-96 my-4" />
    </div>
    
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{new Date(post.dateCreated).toString().substring(4, 15)}</h3>
    <p className="leading-7 [&:not(:first-child)]:mt-6 whitepace-pre-wrap text-left" >{post.content}</p>
    
    </div>);
}
export default ReadBlog