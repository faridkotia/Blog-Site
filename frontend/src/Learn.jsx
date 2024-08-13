import { useState,useEffect} from 'react'
import axios from "axios"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getPost,getPosts,createPost,updatePost,deletePost } from './api'

function App() 
{
  // const [posts,setPosts]=useState("");
  // useEffect(()=>
  // {
    // async function grabData()
    // {
    //   const response = await axios.get("http://localhost:8000/posts");
    //   if(response.status===200)
    //   {
    //     setData(response.data);
    //   }
    //   //console.log(response);
    //   // inside axios.get(_) we will specify the routes made in backend
    //   //also adding await keyword is necessary to add infront of these methods
    // }
    // grabData()

  //   async function loadAllPosts()
  //   {
  //     let data= await getPosts()
  //     if (data) {
  //       setPosts(data);
  //     }
  //   }
  //   loadAllPosts()

  // },[])
  function makePosts()
  {
    let postObject = 
    {
      title:"abcd",
      description:"abcd",
      content: "abcd",
      author:"abcd",
      dateCreated:new Date()
    }
    createPost(postObject);
  }

  return(<>
 <button onClick={makePosts}>Create Post</button>
  
  </>);
}

export default App
