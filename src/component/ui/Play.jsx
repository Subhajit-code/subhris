import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdPlayCircle, MdPauseCircle, MdArrowBackIosNew } from "react-icons/md";
import { BiSolidSkipPreviousCircle, BiSolidSkipNextCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { useMusic } from "../../context/MusicContext";
export const Play = () => {
    const { 
        currentSong, isPlaying, togglePlay, currentTime, duration, seek, 
        showVideo, setShowVideo
    } = useMusic();

    useEffect(() => {
        if (currentSong?.isYouTube && !showVideo) {
            setShowVideo(true);
        }
    }, [currentSong, setShowVideo]);
    const navigate = useNavigate();

    if (!currentSong) return (
        <div className="section-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
            <button className="sidebar-link active" onClick={() => navigate('/')} style={{ margin: '0 auto', width: 'fit-content' }}>Return to Orbit</button>
            <p style={{ marginTop: '20px', color: 'var(--text-dim)' }}>No celestial body selected for observation</p>
        </div>
    );

    const { image, songname, artistName } = currentSong;

    const handleProgressChange = (e) => {
        const time = (e.target.value / 100) * duration;
        seek(time);
    };

    const formatTime = (time) => {
        if (!time && time !== 0) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="section-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <motion.button 
                className="control-btn"
                onClick={() => navigate('/')}
                style={{ alignSelf: 'flex-start', marginBottom: '20px', fontSize: '16px', color: 'var(--galaxy-pink)', display: 'flex', alignItems: 'center', gap: '8px' }}
                whileHover={{ x: -10 }}
            >
                <MdArrowBackIosNew /> Return to Browse
            </motion.button>

            <div className="glass" style={{ 
                padding: '60px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                maxWidth: '600px', 
                width: '100%', 
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(232, 28, 255, 0.1)' 
            }}>
                <motion.div 
                    className="rotating-image-container"
                    animate={{ 
                        rotate: isPlaying ? 360 : 0,
                        scale: isPlaying ? [1, 1.02, 1] : 1
                    }}
                    transition={{ 
                        rotate: { repeat: Infinity, duration: 20, ease: "linear" },
                        scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                    }}
                    style={{ 
                        width: '300px', 
                        height: '300px', 
                        borderRadius: '50%', 
                        overflow: 'hidden', 
                        border: '4px solid var(--galaxy-pink)', 
                        marginBottom: '40px', 
                        boxShadow: '0 0 80px rgba(232, 28, 255, 0.4)' 
                    }}
                >
                    <img src={image} alt={songname} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>

                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ marginBottom: '8px', fontSize: '36px', textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>{songname}</h1>
                    <p style={{ color: 'var(--galaxy-pink)', fontSize: '20px', fontWeight: '500' }}>{artistName}</p>
                    
                    {currentSong?.isYouTube && (
                        <motion.button
                            onClick={() => setShowVideo(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                marginTop: '15px',
                                padding: '8px 20px',
                                borderRadius: '50px',
                                background: 'rgba(232, 28, 255, 0.1)',
                                border: '1px solid var(--galaxy-pink)',
                                color: 'var(--galaxy-pink)',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Watch Video
                        </motion.button>
                    )}
                </div>

                <div className="progress-container" style={{ marginBottom: '30px' }}>
                    <span className="time">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        className="progress-bar"
                        value={(currentTime / duration) * 100 || 0}
                        max="100"
                        onChange={handleProgressChange}
                        style={{ height: '6px' }}
                    />
                    <span className="time">{formatTime(duration)}</span>
                </div>

                <div className="controls-top" style={{ gap: '40px' }}>
                    <button className="control-btn" style={{ color: 'white' }}><BiSolidSkipPreviousCircle size={60} /></button>
                    <motion.button 
                        onClick={togglePlay} 
                        className="control-btn play-pause-btn"
                        style={{ 
                            background: 'white', 
                            color: 'black', 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '40px',
                            boxShadow: '0 0 30px white'
                        }}
                        whileHover={{ scale: 1.1, boxShadow: '0 0 50px white' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {!isPlaying ? <MdPlayCircle /> : <MdPauseCircle />}
                    </motion.button>
                    <button className="control-btn" style={{ color: 'white' }}><BiSolidSkipNextCircle size={60} /></button>
                </div>
            </div>
        </div>
    );
};


