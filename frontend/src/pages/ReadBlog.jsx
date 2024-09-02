import { getPost, createDiscussion, getDiscussions } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getImage } from "../api";

function ReadBlog() {
  const [post, setPost] = useState({});
  const [discussions, setDiscussions] = useState([]);
  const [comment, setComment] = useState("");
  let params = useParams();
  const navigate = useNavigate();
  let id = params.id;

  useEffect(() => {
    async function loadPost() {
      let data = await getPost(id);
      let date = new Date(data.dateCreated);
      data.dateCreated = date.toString();
      setPost(data);
    }
    loadPost();

    async function loadDiscussions() {
      let data = await getDiscussions(id);
      if (Array.isArray(data)) {
        setDiscussions(data);
      } else {
        setDiscussions([data]); // If there is only one discussion, it is returned as an object, so we need to convert it to an array
      }
    }
    loadDiscussions();
  }, []);

  async function handleAddDiscussion(e) {
    e.preventDefault();
    const newDiscussion = {
      comment, // use the correct field name

      dateCreated: new Date(),
    };

    try {
      await createDiscussion(newDiscussion, id);
      setDiscussions((prevDiscussions) => [...prevDiscussions, newDiscussion]);
      setComment(""); // Clear the comment input after submission
    } catch (error) {
      console.error("Error creating discussion:", error);
    }
  }

  return (
    <div className="flex flex-col w-1/3 items-center">
      <Button
        className="w-48 m-4"
        onClick={() => {
          navigate(-1);
        }}
      >
        Return
      </Button>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">
        {post.title}
      </h1>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
        {post.description}
      </h2>
      <div className="flex w-full justify-center">
        <img src={post.image?.data} alt="Image" className="max-h-40 my-4 " />
      </div>

      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {new Date(post.dateCreated).toString().substring(4, 15)}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitepace-pre-wrap text-left">
        {post.content}
      </p>
      <div className="m-6 w-screen flex justify-center flex-col ">
        <form className="p-2 w-1/4" onSubmit={handleAddDiscussion}>
          <Label htmlFor="comment">Comment:</Label>
          <Input
            id="comment"
            className="mt-3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter Your Comment"
          />
          <Button type="submit" className="mt-3" >
            Submit
          </Button>
        </form>

        <div className="m-6 w-screen flex justify-center flex-col items-center">
  <h1 className="text-2xl font-bold mb-4">Comments</h1>
  <div className="w-full max-w-3xl overflow-y-auto max-h-96 px-4">
    <ul className="space-y-4">
      {discussions.map((discussion, index) => (
        <li key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-800">User Name</h3>
              <span className="text-sm text-gray-500">{new Date(discussion.dateCreated).toLocaleString()}</span>
            </div>
            <p className="text-gray-600 mt-2">{discussion.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

      </div>
    </div>
  );
}

export default ReadBlog;
