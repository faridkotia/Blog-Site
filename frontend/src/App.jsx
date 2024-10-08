import './App.css'
import {HashRouter as Router, Routes,Route} from "react-router-dom";
import About from './pages/About';
import Contact from './pages/Contact';
import CreateBlog from './pages/CreateBlog';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import ReadBlog from './pages/ReadBlog';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import { useEffect } from 'react';
import axios from 'axios';


function App() 
{
  useEffect(()=>
  {
    let token = sessionStorage.getItem("User");
    // as we are storing this token in session storage which does persist on every refresh
    if(token)
    {
      // if the token does exist it will reset the axios headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
   
  },[])
  // it means that whenever the app refreshes 
  
  return(<>
 <Router>
  <Routes>
    <Route path='/' element ={<Landing/>}></Route>
    <Route element={<Layout/>}>
      <Route path='/home' element ={<Home/>}></Route>
      <Route path='/profile' element ={<Profile/>}></Route>
      <Route path='/about' element ={<About/>}></Route>
      <Route path='/contact' element ={<Contact/>}></Route>
      <Route path='/createblog' element ={<CreateBlog/>}></Route>
      <Route path='/readblog/:id' element ={<ReadBlog/>}></Route>
    </Route>
    
  </Routes>
 </Router>
  
  </>);
}

export default App
