import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaHeart, FaSearch, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { RiMusic2Fill } from "react-icons/ri";
import { MdLibraryMusic } from "react-icons/md";
import { useMusic } from "../../context/MusicContext";
import { motion } from "framer-motion";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { allSongs, playSong, currentSong } = useMusic();
    const topSongs = allSongs.slice(0, 10);

    const handleLinkClick = () => {
        if (window.innerWidth <= 1024) {
            toggleSidebar();
        }
    };

    return (
        <aside 
            className={`sidebar glass ${isOpen ? 'open' : ''}`}
            style={{ width: '280px', flexShrink: 0 }}
        >
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-orb">
                        <RiMusic2Fill size={24} />
                    </div>
                    <span className="logo-text">SUBHRIS</span>
                </div>
                <button className="sidebar-close" onClick={toggleSidebar}>
                    <FaTimes />
                </button>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {[
                        { to: "/", icon: <FaHome />, label: "Home" },
                        { to: "/search", icon: <FaSearch />, label: "Explore" },
                        { to: "/upload", icon: <FaCloudUploadAlt />, label: "Broadcaster" }
                    ].map((link, i) => (
                        <li key={i}>
                            <NavLink 
                                to={link.to} 
                                onClick={handleLinkClick} 
                                className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
                            >
                                <span className="nav-icon-container">{link.icon}</span>
                                <span>{link.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-library">
                <div className="library-header">
                    <div className="lib-header-content">
                        <MdLibraryMusic /> <span>CELESTIAL PLAYLIST</span>
                    </div>
                </div>
                <div className="library-items">
                    {allSongs.map((song, i) => (
                        <motion.div 
                            key={song.id} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => {
                                playSong(song);
                                handleLinkClick();
                            }}
                            className={`mini-song-item ${currentSong?.id === song.id ? 'active' : ''}`}
                        >
                            <img src={song.image} alt="" className="mini-poster" />
                            <div className="mini-details">
                                <div className="mini-name">{song.songname}</div>
                                <div className="mini-artist">{song.artistName}</div>
                            </div>
                            {currentSong?.id === song.id && (
                                <div className="active-visualizer">
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
