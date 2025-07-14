import { NavLink } from "react-router";

const Sidebar = () => {
  const linkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded-md font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
    }`;

  return (
    <div className="h-screen bg-white w-[250px] sticky top-0 border-r border-blue-200 shadow-sm px-4 py-6">
      <h3 className="text-2xl font-bold text-blue-700 mb-6">Dashboard</h3>
      <ul className="space-y-2">
        <li>
          <NavLink to="/users" className={linkStyle}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={linkStyle}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" className={linkStyle}>
            Tasks
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
