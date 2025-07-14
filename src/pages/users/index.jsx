import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function UsersPage() {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId,setEditId] = useState(null)

  const handleNewClick = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const initialUsers = [
    { id: 1, name: "Joe", email: 'joe@gmail.com' },
    { id: 2, name: "Mark", email: 'mark@gmail.com' }
  ];

  const { storedValue, setValue } = useLocalStorage('tasks', initialUsers);

  useEffect(() => {
    setData(storedValue);
  }, [storedValue]);

  const handleSave = () => {
    let updatedUsers;
    if(editId){
      updatedUsers = data.map(user=>{
        if(user.id==editId){
          user = {
            ...user,name,email
          }
        }
        return user;
      })
    }else{
      const newUser = {
        id: Date.now(),
        name,
        email
      };
      updatedUsers = [...data, newUser];
    }
    setData(updatedUsers);
    setValue(updatedUsers);
    setName('');
    setEmail('');
    setEditId(null)
    closeModal();
  };

  const deleteUser = (id) => {
    const users = data.filter(e => e.id !== id);
    setData(users);
    setValue(users);
  };

  const editUser = (user) =>{
    setEditId(user.id)
    setName(user.name)
    setEmail(user.email)
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
          + New User
        </button>

        <div className="space-y-4">
          {data.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg text-blue-800">{p.name}</p>
                <p className="text-gray-600">{p.email}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => editUser(p)}
                  className="text-orange-500 hover:text-orange-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(p.id)}
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
            <h2 className="text-2xl font-bold mb-5 text-blue-700">Create New User</h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border border-gray-300 p-2 rounded w-full mb-3 focus:outline-blue-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
                {editId? 'Update':'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
