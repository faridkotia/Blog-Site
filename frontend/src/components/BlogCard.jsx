import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

function BlogCard({post})//{}-> refers to props destructuring
{   
    let date = new Date(post.dateCreated);
    let dateString = date.toString();
    return(<Card className="flex w-full justify-center my-8 hover:bg-muted">
    <Link to={`/readblog/${post._id}`} className="w-full">
        <CardHeader>
                <CardTitle>
                    <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-primary">{post.title}</h1>
                </CardTitle> 
                <CardDescription>   
                    <h2>{post.description}</h2>
                </CardDescription>
        </CardHeader>
        <CardContent>
            <p>{dateString.slice(4,15)}</p>
        </CardContent>
        </Link>
        </Card>
        
    );
   
}

export default BlogCard;