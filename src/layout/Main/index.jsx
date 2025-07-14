import { Outlet } from "react-router";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const MainLayout =()=>{
    return (
        <div className="flex">
            <Sidebar/>
            <div className="w-full">
                <Navbar/>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout;