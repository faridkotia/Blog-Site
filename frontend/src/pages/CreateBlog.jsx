import { useState,useEffect } from "react";
import { createPost } from "../api";

function CreateBlog()
{
    const [title,setTitle]=useState("")
    const [decription,setDescription]=useState("")
    const [content,setContent]=useState("")
    //onchange tag function - > it calls some function everytime something within the tag changes
    async function handleSubmit()
    {
        let submitObject = 
        {
            title:title,
            description:decription,
            content:content,
            author:null,
            dateCreated:new Date()
        }
       await createPost(submitObject);
    }
    return(
    <form onSubmit={handleSubmit}>
        <label >Blog Post Title:</label>
        <input type="text" required name="title" placeholder="Name" maxLength={100} onChange={(event)=>{setTitle(event.target.value)}} /> <br />
        <label >Blog Desciption:</label>
        <input type="text" required name="decription" placeholder="Decription" maxLength={200} onChange={(event)=>{setDescription(event.target.value)}} /><br />
        <label >Blog Content:</label>
        <textarea type="text" required name="content" placeholder="Content" maxLength={5000} onChange={(event)=>{setContent(event.target.value)}}/> <br />
        <button type="submit">Submit</button>
        {/* when we the button typreis submit it means that it will invoke whatever function is in onSubmit*/}
    </form>);
}
export default CreateBlog