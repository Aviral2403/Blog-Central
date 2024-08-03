import { IF } from "../url";

/* eslint-disable react/prop-types */
const ProfilePosts = ({ p, navigateToPost }) => {
  return (
    <div 
      className="w-full flex flex-col cursor-pointer mt-8 md:flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4"
      onClick={() => navigateToPost(p._id)}
    >
      {/* left */}
      <div className="w-full lg:w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF + p.photo}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      {/* right */}
      <div className="flex flex-col w-full lg:w-[65%] space-y-2">
        <h1 className="text-xl font-bold mb-1 md:text-2xl">
          {p.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between text-sm font-semibold text-gray-500">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {p.desc.slice(0, 200)} <span className="text-blue-500">...Read More</span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;
