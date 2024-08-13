import { Link } from "react-router-dom";


function BlogCard({post})//{}-> refers to props destructuring
{   console.log(post);
    let date = new Date(post.dateCreated);
    let dateString = date.toString();
    return(
    <Link to={`/readblog/${post._id}`} className="post">
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
            <p>{dateString.slice(4,15)}</p>
        </Link>
        
    );
   
}

export default BlogCard;