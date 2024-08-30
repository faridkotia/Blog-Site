import { useState, useRef } from "react";
import { createImage, createPost } from "../api";

function CreateBlog()
{
    const [title,setTitle]=useState("")
    const [decription,setDescription]=useState("")
    const [content,setContent]=useState("")
    const [file, setFile] = useState()
    //onchange tag function - > it calls some function everytime something within the tag changes
    const MAX_FILE_SIZE =  15000000
    
    const inputFile = useRef(null)

    
    async function handleSubmit(e)
    {
        e.preventDefault()
        let submitObject = 
        {
            title:title,
            description:decription,
            content:content,
            author:null,
            dateCreated:new Date(),
            file: file
        }
       await createPost(submitObject)
       setTitle("");
        setDescription("");
        setContent("");
        setFile(null);

        // Clear the file input
        if (inputFile.current) {
            inputFile.current.value = "";
        }
       
    }

    function handleFileUpload(e) {
        const file = e.target.files[0]
        const fileExtension = file.name.substring(file.name.lastIndexOf("."))
        if (fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png") {
            alert("Files must be jpg or png")
            inputFile.current.value = ""
            inputFile.current.type = "file"
            return
        }
        if (file.size > MAX_FILE_SIZE) {
            alert("File size exceeds the limit (15 Mb)")
            inputFile.current.value = ""
            inputFile.current.type = "file"
            return
        }

        setFile(file)
    }

    return(
    <form onSubmit={handleSubmit}>
        <label >Blog Post Title:</label>
        <input type="text" required name="title" placeholder="Name" maxLength={100} onChange={(event)=>{setTitle(event.target.value)}} /> <br />
        <label >Blog Desciption:</label>
        <input type="text" required name="decription" placeholder="Decription" maxLength={200} onChange={(event)=>{setDescription(event.target.value)}} /><br />
        <label >Blog Content:</label>
        <textarea type="text" required name="content" placeholder="Content" maxLength={5000} onChange={(event)=>{setContent(event.target.value)}}/> <br />
        <label >Insert Header Image:</label>
        <input type="file" onChangeCapture={handleFileUpload} required/>
        <button type="submit">Submit</button>
        {/* when we the button type is submit it means that it will invoke whatever function is in onSubmit*/}
    </form>);
}
export default CreateBlog