import React, { useEffect, useState } from "react";
import { useMusic } from "../../context/MusicContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const VideoPopup = () => {
    const { 
        currentSong, isPlaying, setIsPlaying,
        showVideo, setShowVideo 
    } = useMusic();

    const [videoId, setVideoId] = useState(null);

    useEffect(() => {
        if (currentSong?.filePath && currentSong.isYouTube) {
            const match = currentSong.filePath.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            if (match) {
                setVideoId(match[1]);
                console.log("VideoPopup: Detected Video ID", match[1]);
            }
        }
    }, [currentSong]);

    if (!currentSong || !currentSong.isYouTube) {
        if (showVideo) setShowVideo(false);
        return null;
    }

    return (
        <AnimatePresence>
            {showVideo && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="video-popup-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(25px)'
                    }}
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        className="video-popup-content"
                        style={{
                            width: '90%',
                            maxWidth: '1000px',
                            aspectRatio: '16/9',
                            position: 'relative',
                            boxShadow: '0 0 100px rgba(232, 28, 255, 0.3)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            background: '#000',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <button 
                            onClick={() => {
                                setShowVideo(false);
                                setIsPlaying(false);
                            }}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(232, 28, 255, 0.8)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10001,
                                fontSize: '24px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(232, 28, 255, 0.4)'
                            }}
                        >
                            <IoClose />
                        </button>
                        
                        {videoId ? (
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                style={{ borderRadius: '20px' }}
                            ></iframe>
                        ) : (
                            <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <p>Loading Galaxy Stream...</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoPopup;
