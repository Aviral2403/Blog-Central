import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    if (!user) return; // Ensure user context is available before fetching posts
    setLoader(true);
    try {
      const url = `${URL}/api/posts/user/${user._id}`;
      const header = {
        "ngrok-skip-browser-warning": "69420",
      };
      const res = await axios.get(url, { headers: header });
      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user, search]); // Add user to dependencies to re-fetch when user context is updated

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link
              key={post._id}
              to={user ? `/posts/post/${post._id}` : "/login"}
            >
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <div className="flex flex-col items-center justify-center h-auto sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
              <img
                className="w-full h-auto"
                src="https://www.outbrain.com/blog/wp-content/uploads/2024/06/how-to-write-your-first-blog-post.png"
                alt=""
              />
            </div>
            <h3 className="font-bold mb-4 sm:mb-8 md:mt-16">
              No posts available
            </h3>
            <h3>No Blogs Yet?</h3>
            <h3>
              <Link to="/write" className="text-gray-500 font-bold block">
                Write your first post..click here
              </Link>
            </h3>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
