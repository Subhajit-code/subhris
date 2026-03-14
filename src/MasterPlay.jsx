import React from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { useMusic } from "./context/MusicContext";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from 'react-player';

import { IoClose } from "react-icons/io5";

const MasterPlay = () => {
    const { 
        currentSong, isPlaying, togglePlay, currentTime, duration, seek, 
        volume, setVolume, setIsPlaying, setCurrentTime, setDuration,
        showVideo, setShowVideo
    } = useMusic();

    if (!currentSong) return null;

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressChange = (e) => {
        const time = (e.target.value / 100) * duration;
        seek(time);
    };

    return (
        <AnimatePresence>
            <motion.div 
                className="master-play"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
                {/* Hidden player for when the modal is closed but song still playing */}
                {!showVideo && currentSong?.isYouTube && (
                    <div style={{ position: 'absolute', top: '-1000px', left: '-1000px', pointerEvents: 'none' }}>
                        <ReactPlayer 
                            url={currentSong.filePath}
                            playing={isPlaying}
                            volume={volume}
                            onProgress={(state) => setCurrentTime(state.playedSeconds)}
                            onDuration={(d) => setDuration(d)}
                            onEnded={() => setIsPlaying(false)}
                            width="0"
                            height="0"
                        />
                    </div>
                )}
                <div className="player-info">
                    <motion.img 
                        src={currentSong.image} 
                        alt={currentSong.songname} 
                        className="player-poster" 
                        animate={isPlaying ? { boxShadow: ['0 0 10px rgba(232, 28, 255, 0.2)', '0 0 20px rgba(232, 28, 255, 0.6)', '0 0 10px rgba(232, 28, 255, 0.2)'] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <div>
                        <div className="song-name">{currentSong.songname}</div>
                        <div className="artist-name">{currentSong.artistName}</div>
                    </div>
                </div>

                <div className="player-controls">
                    <div className="controls-top">
                        <button className="control-btn"><FaStepBackward size={16} /></button>
                        <button className="control-btn play-pause-btn" onClick={togglePlay}>
                            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} style={{ marginLeft: '2px' }} />}
                        </button>
                        <button className="control-btn"><FaStepForward size={16} /></button>
                    </div>

                    <div className="progress-container">
                        <span className="time">{formatTime(currentTime)}</span>
                        <div className="progress-bar">
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={(currentTime / duration) * 100 || 0}
                                onChange={handleProgressChange}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    cursor: 'pointer',
                                    zIndex: 2
                                }}
                            />
                            <div 
                                className="progress-fill" 
                                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                            ></div>
                        </div>
                        <span className="time">{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="volume-container">
                    {volume === 0 ? <HiVolumeOff size={20} /> : <HiVolumeUp size={20} />}
                    <div className="progress-bar" style={{ width: '100px' }}>
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                                zIndex: 2
                            }}
                        />
                        <div 
                            className="progress-fill" 
                            style={{ width: `${volume * 100}%` }}
                        ></div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MasterPlay;