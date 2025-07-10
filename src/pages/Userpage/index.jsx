import { useState } from "react";
import toast from "react-hot-toast";

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, firstName: "Azim", lastName: "Eshmamatov", age: 18, location: 'Navoiy', gender: 'male' },
    { id: 2, firstName: "Temur", lastName: "Mamatov", age: 45, location: 'Namangan', gender: 'male' }
  ]);

  const handleDelete = (userId) => {
    if (confirm("Are you sure to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
      toast.success("User deleted!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        id: Date.now(),
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        age: Number(e.target.age.value),
        location: e.target.location.value,
        gender: e.target.gender.value
      }
    ]);
    toast.success("User added!");
    e.target.reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold text-center text-blue-800 mb-8">User Management</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input required type="text" name="firstName" placeholder="First Name"
          className="input-style" />
        <input required type="text" name="lastName" placeholder="Last Name"
          className="input-style" />
        <input required type="number" name="age" placeholder="Age"
          className="input-style" />
        <input required type="text" name="location" placeholder="Location"
          className="input-style" />
        <select name="gender" className="input-style">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="not_known">Not Known</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition">
          ➕ Add User
        </button>
      </form>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 italic">No users found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div key={user.id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="space-y-1 text-gray-700">
                <h2 className="text-lg font-semibold text-blue-700">#{index + 1} — {user.firstName} {user.lastName}</h2>
                <p><span className="font-medium">Age:</span> {user.age}</p>
                <p><span className="font-medium">Location:</span> {user.location}</p>
                <p><span className="font-medium">Gender:</span> {user.gender}</p>
              </div>
              <button onClick={() => handleDelete(user.id)}
                className="mt-4 inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition">
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
