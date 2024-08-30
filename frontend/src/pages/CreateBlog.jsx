import { useState, useRef } from "react";
import { createImage, createPost } from "../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
        <div className="flex justify-center w-full">
    <form onSubmit={handleSubmit} className="w-1/3">
        <Label className="flex left-0 p-2">Blog Post Title:</Label>
        <Input type="text" required name="title" placeholder="Name" maxLength={100} onChange={(event)=>{setTitle(event.target.value)}} />
        <Label className="flex left-0 p-2">Decription:</Label>
        <Input type="text" required name="decription" placeholder="Decription" maxLength={200} onChange={(event)=>{setDescription(event.target.value)}} />
        <Label className="flex left-0 p-2">Content:</Label>
        <Textarea type="text" required name="content" placeholder="Content" maxLength={5000} onChange={(event)=>{setContent(event.target.value)}}/> 
        <Label className="flex left-0 p-2">Upload Image:</Label>
        <Input type="file" onChangeCapture={handleFileUpload} ref={inputFile} className="cursor-pointer hover:bg-accent" required/>
        <Button type="submit" className="mt-4">Submit</Button>
        {/* when we the button type is submit it means that it will invoke whatever function is in onSubmit*/}
    </form>
    </div>);
}
export default CreateBlog