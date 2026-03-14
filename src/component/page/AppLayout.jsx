import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header"
import StarBackground from "../ui/StarBackground";
import VideoPopup from "../ui/VideoPopup";
import Sidebar from "./Sidebar";
import MasterPlay from "../../MasterPlay";

const Applayout = () =>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="noise-overlay"></div>
            <StarBackground />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="main-content">
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                <main>
                    <Outlet/>
                </main>
            </div>
            <MasterPlay />
            <VideoPopup />
        </div>
    )
}
export default Applayout;


