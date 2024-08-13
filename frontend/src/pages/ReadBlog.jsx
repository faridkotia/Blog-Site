import { getPost } from "../api";
import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
// this react hook called useParams will actully help us in grabbing the id in the url(which is provided by mango db)
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
            setPost(data);
        }
        loadPost()
    },[])
// useNavigate is kind of link that allows us to traverse between pages except use navigate is used within js code not jsx
    
    return(<>
    <button onClick={()=>{
        //useNavigate(-1) // useNavigate will take you back on page but we cannot use react hooks as the are so we need to create the alias of them
        navigate(-1);
        }}>Return</button>

    <h1>{post.title}</h1>
    <h2>{post.description}</h2>
    <h3>{new Date(post.dateCreated).toString().substring(4, 15)}</h3>
    <p>{post.content}</p>
    
    </>);
}
export default ReadBlog