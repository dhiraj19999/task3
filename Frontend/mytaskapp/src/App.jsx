import React from 'react';
import HomePage from './pages/Home';
import Navbar from './components/Navbar';
import AuthForm from './pages/LoginSignup';
import ProjectPage from './pages/ProjectPage';
import MyTasksPage from './pages/Task';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
  </>
  );
}

export default App;
