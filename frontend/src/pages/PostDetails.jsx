import { useNavigate, useParams } from "react-router-dom";
import Comments from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { useEffect, useState, useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";

const PostDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id: postId } = useParams();
  const [comments, setComments] = useState([]); // to display all comments
  const [comment, setComment] = useState(""); // to add comment
  const [post, setPost] = useState({
    categories: [], // Ensure categories is always an array
  });

  const fetchPost = useCallback(async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const renderDescription = (desc) => {
    if (!desc) {
      return null;
    }
    return desc.split('\n').map((str, index) => (
      <p key={index}>{str}</p>
    ));
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`${URL}/api/posts/${postId}?token=` + localStorage.getItem('token'), { withCredentials: true })
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/api/comments/create?token=${localStorage.getItem("token")}`,
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="px-4 md:px-16 lg:px-[200px] mt-8">
        {post.photo && (
          <img
            className="w-full mx-auto max-h-[400px] object-cover"
            src={`${IF}${post.photo}`}
            alt=""
          />
        )}
        <div className="mt-4 md:mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p className="cursor-pointer" onClick={() => navigate(`/edit/${postId}`)}>
                  <FiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p className="text-xs md:text-base">@{post.username}</p>
            <div className="flex space-x-2">
              <p className="text-xs md:text-base">{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p className="text-xs md:text-base">{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-8">
            {renderDescription(post.desc)}
          </div>
        </div>
        <div className="mt-8 font-semibold">
          <p className="w-full">Categories:</p> 
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.isArray(post.categories) && post.categories.length > 0 ? (
              post.categories.map((c, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {comments?.map((c) => (
            <Comments key={c._id} c={c} post={post} />
          ))}
        </div>
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a comment"
            className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
          />
          <button
            onClick={postComment}
            className="bg-black text-sm text-white px-2 py-2 md:w-[30%] md:px-4 mt-4 md:mt-0"
          >
            Add Comment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
