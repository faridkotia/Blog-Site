import BlogCard from "../components/BlogCard";
import { useState,useEffect } from "react";
import { getPosts } from "../api";
import * as jwt_decode from "jwt-decode";

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

    return(<>
    <label htmlFor="">Name</label>
    <h2>{user.name}</h2><br />
    <label htmlFor="">Email</label>
    <h2>{user.email}</h2><br />
    <label htmlFor="">Join Date:</label>
    <h2>{user.joinDate}</h2><br />
    {posts.map((post)=>
    {
        return <BlogCard post={post}/>
    })}
    </>);
}
export default Profile