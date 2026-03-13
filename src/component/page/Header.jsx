import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiMusic2Fill } from "react-icons/ri";
import { motion } from "framer-motion";

export const Header = ({ toggleSidebar, isSidebarOpen }) => {
    const navigate = useNavigate();

    return (
        <header className="app-header">
            <div className="header-container luxe">
                <div className="header-left">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="hamburger-menu"
                        onClick={toggleSidebar}
                        style={{ 
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </motion.button>
                    
                        <span className="logo-text">SUBHRIS</span>
                </div>
                
                <div className="header-right">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="admin-btn-luxe"
                        onClick={() => navigate("/admin")}
                    >
                        <span className="btn-glow"></span>
                        Admin Nexus
                    </motion.button>
                    <div className="user-badge-luxe">
                        <div className="status-dot"></div>
                        Galaxy Explorer
                    </div>
                </div>
            </div>
        </header>
    );
};

