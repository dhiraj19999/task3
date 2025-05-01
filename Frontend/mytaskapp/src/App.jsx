import React from 'react';
import HomePage from './pages/Home';
import Navbar from './components/Navbar';
import AuthForm from './pages/LoginSignup';
import ProjectPage from './pages/ProjectPage';
import MyTasksPage from './pages/Task';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={ <AuthForm />} />
      <Route path="/projects" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><MyTasksPage /></ProtectedRoute>} />
    </Routes>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        theme="colored"
        progress="indeterminate"
        toastStyle={{ backgroundColor: 'pink', color: 'black' }} // Custom styles for the toast
        bodyStyle={{ color: '#fff' }} // Custom styles for the toast body
        progressStyle={{ backgroundColor: '#3b82f6' }} // Custom styles for the progress bar
      />
  </>
  );
}

export default App;
