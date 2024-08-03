import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { TiDelete } from "react-icons/ti";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../url";


const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const { user } = useContext(UserContext)
  const [cat, setCat] = useState("")
  const [cats, setCats] = useState([])
  const navigate = useNavigate()

  const handleCreate = async (e) => {
    e.preventDefault()
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats
    }
    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("img", filename)
      data.append("file", file)
      post.photo = filename
      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data)
        // console.log(imgUpload.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    //post upload
    // console.log(post)
    try {
      const res = await axios.post(URL + "/api/posts/create?token=" + localStorage.getItem("token"), post, { withCredentials: true })
      navigate("/posts/post/" + res.data._id)
      // console.log(res.data)

    }
    catch (err) {
      console.log(err)
    }

  }


  const addCategory = () => {
    let updatedCats = [...cats]
    updatedCats.push(cat)
    setCat("")
    setCats(updatedCats)

  }

  const deleteCategory = (i) => {
    let updatedCats = [...cats]
    updatedCats.splice(i)
    setCats(updatedCats)

  }

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl ">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter post title" className="px-4 py-2 outline-none border-2 border-gray-300" />
          <input onChange={(e) => setFile(e.target.files[0])} type="file" className="px-4" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input value={cat} onChange={(e) => setCat(e.target.value)} className="px-4 py-2 outline-none border-2 border-gray-300" placeholder="Enter post category" type="text" />
              <div onClick={addCategory} className="bg-black text-white px-3 py-1 fontweight-600 cursor-pointer rounded md hover:bg-gray-500 hover:text-black">Add</div>
            </div>
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                  <p>{c}</p>
                  <p onClick={() => deleteCategory(i)} className="cursor-pointer"><TiDelete /></p>
                </div>
              ))}
            </div>
          </div>
          <textarea onChange={(e) => setDesc(e.target.value)} className="px-4 py-2 outline-none border-2 border-gray-300" rows={15} cols={30} placeholder="Enter Post Description"></textarea>
          <button onClick={handleCreate} className="bg-black w-full md:w-[25%] mx-auto text-white font-semibold px-4 py-2 rounded-lg md:text-xl text-lg hover:bg-gray-500 hover:text-black">Create</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;
