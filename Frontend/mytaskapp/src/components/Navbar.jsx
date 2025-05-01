import React from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link component
import { useNavigate } from 'react-router-dom'; 
import {toast} from 'react-toastify'
export default function Navbar() {
  const auth = localStorage.getItem("token") ? true : false;
  const navigate = useNavigate(); 
  const Logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!",{
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: "indeterminate",
      theme: "light",
     
    })
    navigate("/login", { replace: true });
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-900/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
          TaskTracker
        </div>

        {/* Navbar Links */}
        <ul className="flex gap-6 text-lg font-medium">
          <NavItem label="Home" to="/" />
          {!auth ? (
            <NavItem label="Login" to="/login" />
          ) : (
            <button
              onClick={Logout}
              className="bg-teal-500 hover:bg-teal-400 text-white text-lg px-4 py-3 -mt-3 rounded-xl shadow-lg transition"
            >
              Logout
            </button>
          )}
          <NavItem label="MyProjects" to="/projects" />
          <NavItem label="MyTasks" to="/tasks" />
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ label, to }) {
  return (
    <li>
      <Link
        to={to}
        className="text-white hover:text-teal-400 transition duration-300 ease-in-out hover:underline underline-offset-4"
      >
        {label}
      </Link>
    </li>
  );
}
