import { IF } from "../url";

/* eslint-disable react/prop-types */
const HomePosts = ({ post }) => {
  return (
    <div className="lg:px-4 w-full flex flex-col mt-8 space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 ">
      {/* Post Title */}
      <h1 className="text-xl font-bold mb-1 sm:mb-2 sm:text-2xl lg:hidden">
        {post.title}
      </h1>

      {/* Post Image */}
      <div className="w-full h-[40vh] sm:h-[40vh] md:h-[40vh] lg:w-[45%] lg:h-[200px] flex justify-center items-center">
        <img
          src={IF + post.photo}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Post Details */}
      <div className="flex flex-col w-full space-y-2 lg:w-[65%] lg:space-y-0">
        {/* Show title only for lg screens */}
        <h1 className="text-xl font-bold mb-1 lg:mb-2 lg:text-2xl hidden lg:block">
          {post.title}
        </h1>
        <div className="flex flex-col justify-between text-sm font-semibold text-gray-500">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm sm:text-lg">
          {post.desc.slice(0, 200)}{" "}
          <span className="text-blue-500">...Read More</span>
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
