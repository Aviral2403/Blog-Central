import { IF } from "../url";

/* eslint-disable react/prop-types */
const HomePosts = ({post}) => {
  return (
    <div className="w-full flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-4">
      {/* left */}
      <div className="w-full md:w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF+post.photo}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      {/* right */}
      <div className="flex flex-col w-full md:w-[65%] space-y-2 md:space-y-0">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between text-sm font-semibold text-gray-500">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg ">
        {post.desc.slice(0,200)} <span className="text-blue-500">...Read More</span>
        </p>
      </div>
    </div>
  );
};

export default HomePosts;

