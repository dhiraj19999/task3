import {  useState } from 'react';
import axios from 'axios';  
import { useEffect } from 'react';
import { toast } from 'react-toastify';
export default function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [taskInputs, setTaskInputs] = useState({}); // Store task inputs dynamically by project id

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://task3-33kr.onrender.com/api/projects',

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ); // Adjust the URL as needed
      setProjects(response.data);

    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

   useEffect(() => {
     
  

    fetchProjects();
  
   },[])



  // Create Project
  const handleCreateProject = () => {
 
   console.log('Creating project:', newProject); // You can send this project data to your backend here
    axios.post('https://task3-33kr.onrender.com/api/projects', newProject, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
         fetchProjects(); // Refresh the project list after creating a new project
        setNewProject({ name: '', description: '' });
        toast.success('Project created successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 'indeterminate',
          theme: 'light',
        });
      })
      .catch((error) => {
        console.error('Error creating project:', error);
      });

  };

  // Add Task
  const handleCreateTask = (projectId) => {
    
    axios.post(`https://task3-33kr.onrender.com/api/tasks/${projectId}`, taskInputs, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        console.log('Task created successfully:', response.data);
        fetchProjects(); // Refresh the project list after creating a new task
        toast.success('Task created successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 'indeterminate',
          theme: 'light',
        });
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-12">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Project Dashboard</h1>

        {/* Create Project Form */}
        <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-xl shadow-lg mb-8 hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Project</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="text"
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={handleCreateProject}
              className="bg-green-600 text-white rounded-lg px-4 py-3 hover:bg-green-700 transition ease-in-out duration-300"
            >
              Add Project
            </button>
          </div>
        </div>

        {/* List of Projects */}
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
              <p className="text-gray-200">{project.description}</p>

              {/* Create Task for this project */}
              <div className="mt-4">
                <h4 className="text-lg font-medium text-white">Add Task</h4>
                <input
                  type="text"
                  placeholder="Task Title"
                  value={taskInputs?.title || ''}
                  onChange={(e) =>
                    setTaskInputs({
                      ...taskInputs,
                     title: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="text"
                  placeholder="Task Description"
                  value={taskInputs?.description || ''}
                  onChange={(e) =>
                    setTaskInputs({
                      ...taskInputs,
                     description: e.target.value 
                    })
                  }
                  className="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <select
                  value={taskInputs?.status || ''}
                  onChange={(e) =>
                    setTaskInputs({...taskInputs,status: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={() => handleCreateTask(project._id)}
                  className="bg-blue-600 text-white rounded-lg px-4 py-3 mt-4 hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
