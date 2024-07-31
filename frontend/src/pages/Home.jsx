import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader"; 
import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { URL } from "../url";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const {user} = useContext(UserContext)
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(true); // Add loader state

  const fetchPosts = useCallback(async () => {
    setLoader(true); // Set loader to true before fetching
    try {
      const res = await axios.get(`${URL}/api/posts${search}`);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false); // Set loader to false after fetching
    }
  }, [search]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="content flex-1 px-8 md:px-[200px]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
          <Link to={user?`/posts/post/${post._id}`:"/register"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>

            
          ))
        ) : (
          <>
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <img 
              src="https://static.vecteezy.com/system/resources/thumbnails/022/922/080/small/magnifying-glass-with-question-mark-search-no-result-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" 
              alt="No Results" 
              className="w-48 h-48 md:w-64 md:h-64" 
            />
            <h3 className="text-center font-bold mt-4">
              No Related Posts For Your Search
            </h3>
          </div>

          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
