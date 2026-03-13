import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMusic } from "./context/MusicContext";
import { FaTrash, FaLock, FaSignOutAlt, FaMusic } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Admin = () => {
    const navigate = useNavigate();
    const { allSongs, removeSong, isAdmin, loginAdmin, logoutAdmin } = useMusic();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // The hashed password for "skyislimit"
    const ADMIN_HASH = "776269666e133c9444315354974f35e47c1f8876abb78f1e29e846059d6e5793";

    async function hashPassword(string) {
        const utf8 = new TextEncoder().encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const trimmedPassword = password.trim();
        if (trimmedPassword === "skyislimit") {
            loginAdmin();
            setError("");
            setPassword("");
        } else {
            setError("Incorrect Access Code. Access Denied.");
        }
    };

    if (!isAdmin) {
        return (
            <div className="section-container" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                minHeight: '80vh'
            }}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass"
                    style={{ 
                        padding: '40px', 
                        width: '100%', 
                        maxWidth: '400px',
                        textAlign: 'center',
                        background: 'rgba(15, 23, 42, 0.8)',
                        position: 'relative'
                    }}
                >
                    <button 
                        onClick={() => navigate("/")}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-dim)',
                            fontSize: '24px',
                            cursor: 'pointer'
                        }}
                    >
                        <IoClose />
                    </button>
                    <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        background: 'rgba(232, 28, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        color: 'var(--galaxy-pink)',
                        fontSize: '30px'
                    }}>
                        <FaLock />
                    </div>
                    <h2 style={{ marginBottom: '10px' }}>Admin Nexus</h2>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '30px', fontSize: '14px' }}>
                        Enter the encrypted access key to manage the galaxy.
                    </p>
                    
                    <form onSubmit={handleLogin}>
                        <input 
                            type="password" 
                            placeholder="Enter access code..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 20px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: 'white',
                                marginBottom: '20px',
                                outline: 'none'
                            }}
                        />
                        {error && <p style={{ color: '#ff4444', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}
                        <button 
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'linear-gradient(to right, #e81cff, #40c9ff)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'black',
                                fontWeight: '700',
                                cursor: 'pointer'
                            }}
                        >
                            AUTHENTICATE
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="section-container animate-fade-in">
            <header style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-end',
                marginBottom: '40px' 
            }}>
                <div>
                    <h1 style={{ marginBottom: '8px' }}>Admin Nexus</h1>
                    <p style={{ color: 'var(--galaxy-pink)' }}>Managing {allSongs.length} Cosmic Transmissions</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                        onClick={logoutAdmin}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                    <button 
                        onClick={() => navigate("/")}
                        style={{
                            background: 'rgba(232, 28, 255, 0.1)',
                            border: 'none',
                            color: 'var(--galaxy-pink)',
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            cursor: 'pointer'
                        }}
                    >
                        <IoClose />
                    </button>
                </div>
            </header>

            <div className="glass" style={{ padding: '20px', background: 'rgba(0,0,0,0.3)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)', fontSize: '14px' }}>
                            <th style={{ padding: '16px' }}>#</th>
                            <th style={{ padding: '16px' }}>Title</th>
                            <th style={{ padding: '16px' }}>Artist</th>
                            <th style={{ padding: '16px', textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {allSongs.map((song, index) => (
                                <motion.tr 
                                    key={song.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    <td style={{ padding: '16px', color: 'var(--text-dim)' }}>{index + 1}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img src={song.image} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                            <span style={{ fontWeight: '600' }}>{song.songname}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', color: 'var(--text-dim)' }}>{song.artistName}</td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <button 
                                            onClick={() => {
                                                if (window.confirm(`Vanish "${song.songname}" from the collection?`)) {
                                                    removeSong(song.id);
                                                }
                                            }}
                                            style={{
                                                background: 'rgba(255, 68, 68, 0.1)',
                                                border: 'none',
                                                color: '#ff4444',
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontSize: '16px'
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
                {allSongs.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-dim)' }}>
                        <FaMusic size={40} style={{ marginBottom: '20px', opacity: 0.3 }} />
                        <p>The galaxy is currently silent.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
