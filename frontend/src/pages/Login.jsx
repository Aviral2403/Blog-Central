import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [loginSuccess, setloginSuccess] = useState(false);
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()


  const handleLogin = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true })
      console.log(res.data)
      const token = res.data.token
      localStorage.setItem('token', token)
      setloginSuccess(true)
      setUser(res.data.user)
      setTimeout(() => navigate('/'), 1000);
    }
    catch (err) {
      setError(true)
      setloginSuccess(false)
      console.log(err)
    }
  }


  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog-Central</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[70vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[45%]">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your Password"
          />
          <button onClick={handleLogin} className="w-full px-4 py-4 text-lg  font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black">
            Login
          </button>
          {error && <h3 className="text-red-500 text-sm">Wrong Credentials</h3>}
          {!error && loginSuccess && (
            <h3 className="text-green-500 text-sm">User Successfully Logged-In</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
