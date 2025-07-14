import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function TasksPage() {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editId, setEditId] = useState(null);

  const handleNewClick = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const initialTasks = [
    { id: 1, title: "Waking", desc: 'I have to wake up early!' },
    { id: 2, title: "Sleeping", desc: 'I have to get a good sleep!' }
  ];

  const { storedValue, setValue } = useLocalStorage('tasks', initialTasks);

  useEffect(() => {
    setData(storedValue);
  }, [storedValue]);

  const handleSave = () => {
    let updatedTasks;
    if (editId) {
      updatedTasks = data.map(task =>{
        if(task.id=editId){
          task = {
            ...task,title,desc
          }
        }
        return task
      });
    } else {
      const newTask = {
        id: Date.now(),
        title,
        desc
      };
      updatedTasks = [...data, newTask];
    }
    setData(updatedTasks);
    setValue(updatedTasks);
    setTitle('');
    setDesc('');
    setEditId(null);
    closeModal();
  };
  

  const deleteTask = (id) => {
    const tasks = data.filter(e => e.id !== id);
    setData(tasks);
    setValue(tasks);
  };

  const editTask = (task) =>{
    setEditId(task.id)
    setTitle(task.title)
    setDesc(task.desc)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
      <div className="flex justify-between font-semibold text-blue-700 text-shadow-2xs text-2xl">
          <p>Quantity: {data.length}</p>
        </div>
        <hr className="text-blue-800 mb-5 mt-5"/>
        <button
          onClick={handleNewClick}
          className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          + New Task
        </button>

        <div className="space-y-4">
          {data.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-lg text-blue-800">{p.title}</p>
                <p className="text-gray-600">{p.desc}</p>
              </div>
            <div className="flex gap-4">
            <button
                onClick={() => editTask(p)}
                className="text-orange-500 hover:text-orange-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(p.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-2xl min-w-[320px] w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-5 text-blue-700">Create New Task</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-blue-500"
            />
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
              className="border border-gray-300 p-2 rounded w-full mb-5 focus:outline-blue-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                {editId ? 'Update': 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TasksPage;
