import { getPosts } from "../api";
import { useState,useEffect } from "react";
import BlogCard from "../components/BlogCard";
//if we want to load something into our state from external source like an api we need useEffect hook
function Home()
{
    const [posts ,setPosts] = useState([]);

    useEffect(()=>
    {
        async function loadAllPosts()
        {
            const data = await getPosts();
            //sorting the dates according to the most recent
            data.sort((d1,d2)=> new Date(d2.dateCreated).getTime()-new Date(d1.dateCreated).getTime())
            setPosts(data)
        }
        loadAllPosts()
        // the easiest way to call a function from an api is to define the function inside the useEffect
        // and the then call the function as it allows the funtion to be async

    },[])
    return(<div className="posts">

    {
        posts.map((post)=>
        {
            return(
            <>
            {/* `post` on the left is the prop name, `{post}` on the right is the data */}
            <BlogCard post = {post}/>
            </>);
        })
    }

    </div>);
}
export default Home