import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import {toast,ToastContainer} from 'react-toastify'
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const handleSignup = () => {

    // Handle signup logic here
    axios.post("https://task3-33kr.onrender.com/api/users/register", {
    name,
      country,
      email,
      password,
   
    })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      toast.success("Account created successfully!",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: "indeterminate",
        theme: "light",
        onClose: () => console.log("Toast is closed!"),
      })
      navigate("/projects", { replace: true });
    })
    .catch((error) => {
      console.error("There was an error signing up!", error);
    });

  };
 
const handleLogin = () => {
  
    axios.post("https://task3-33kr.onrender.com/api/users/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!",{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: "indeterminate",
        theme: "dark",
       
      })
     
        navigate("/projects", { replace: true });
    
    })
    .catch((error) => {
      console.error("There was an error logging in!", error);
    });
  };





  return (<> 
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <input
            onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        {!isLogin && (
            <input
            onChange={(e) => setCountry(e.target.value)}
              value={country}
              type="text"
              placeholder="Country"
              className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          )}

          <button
          onClick={()=>{isLogin?handleLogin():handleSignup()}}
            type="button"
            className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-teal-400 font-semibold ml-2 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div> </>
  );
}
