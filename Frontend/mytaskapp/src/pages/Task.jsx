import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function MyTasksPage() {
  const [tasks, setTasks] = useState([
  
  ]);

  const [taskInputs, setTaskInputs] = useState({ title: '', description: '', status: '' });
  const [taskid, setTaskid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Edit task
  
  const getTasks=async () => {
    axios.get("https://task3-33kr.onrender.com/api/tasks",{   
      
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },  

    })
    .then((response) => {
      setTasks(response.data);
    })    

    .catch((error) => {

      console.error('Error fetching tasks:', error);
    });

  
  };
  useEffect(() => { 
    getTasks();
  }, []);
    


  const handleEditTask = (taskId) => {
    setIsModalOpen(true);
    setTaskid(taskId)
   

  };


  const handleSaveTask = () => {
    axios.put(`https://task3-33kr.onrender.com/api/tasks/${taskid}`, taskInputs, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
       getTasks();
        setIsModalOpen(false);
        setTaskInputs({ title: '', description: '', status: '' });
        toast.success("Task updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "indeterminate",
          theme: "light",
        });
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  }

  // Delete task
  const handleDeleteTask = (taskId) => {
    
    axios.delete(`https://task3-33kr.onrender.com/api/tasks/${taskId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        getTasks();
        toast.success("Task deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: "indeterminate",
          theme: "light",
        });
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });

  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400";
      case "InProgress":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-12">
      <div className="max-w-7xl mx-auto p-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-6">My Tasks</h1>

        {/* Task List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {tasks.map((task) => (
            <div key={task._id} className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-white">{task.title}</h3>
              <p className="text-gray-200">{task.description}</p>

              {/* Status Indicator */}
              <div className="flex items-center mt-4">
                <span className={`w-4 h-4 rounded-full mr-2 ${getStatusColor(task.status)}`}></span>
                <span className="text-white">{task.status}</span>
              </div>

              {/* Task Action Buttons: Edit and Delete */}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleEditTask(task._id)}
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition ease-in-out duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-6 rounded-xl shadow-xl w-96">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Task: {taskInputs?.title}</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={taskInputs?.title}
                  onChange={(e) => setTaskInputs({ ...taskInputs, title: e.target.value })}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="text"
                  placeholder="Task Description"
                  value={taskInputs?.description}
                  onChange={(e) => setTaskInputs({ ...taskInputs, description: e.target.value })}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <select
                  value={taskInputs?.status}
                  onChange={(e) => setTaskInputs({ ...taskInputs, status: e.target.value })}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={handleSaveTask}
                  className="bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 text-white rounded-lg px-4 py-2 mt-2 hover:bg-gray-700 transition ease-in-out duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
