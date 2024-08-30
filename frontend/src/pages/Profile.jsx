import BlogCard from "../components/BlogCard";
import { useState,useEffect } from "react";
import { getPosts } from "../api";
import * as jwt_decode from "jwt-decode";
import { Label } from "@/components/ui/label";

function Profile()
{
    const [posts,setPost] = useState([]);
    const [user,setUser] = useState({});

    useEffect(()=>{
        //this basically is the function in which all the posts are extracted which belong to the author
       
        async function loadUserData()
        {
            //extractiong the token from the session storage
            const token = sessionStorage.getItem("User")
            // decoding the token fron the session storage to get the user
            const decodedUser =jwt_decode.jwtDecode(token);
            //loading all the posts which are in the database
            const allPosts = await getPosts();
            // filtering all the posts which belong to the user
            const filteredPosts = allPosts.filter((post)=> post.author == decodedUser._id)
           // setting the user and the the array of filtered posts
            setPost(filteredPosts);
            setUser(decodedUser);
        }

        loadUserData()
    },[])

    return(
    <div className="flex flex-col w-1/3">
    <Label className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2" htmlFor="">Name</Label>
    <h2 >{user.name}</h2><br />
    <Label className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2" htmlFor="">Email</Label>
    <h2 >{user.email}</h2><br />
    <Label className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2" htmlFor="">Join Date:</Label>
    <h2 >{user.joinDate}</h2><br />
    {posts.map((post)=>
    {
        return <BlogCard post={post}/>
    })}
    </div>);
}
export default Profile