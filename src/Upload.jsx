import React, { useState } from 'react';
import { useMusic } from './context/MusicContext';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const { addSong, fetchYouTubeMetadata } = useMusic();
    const navigate = useNavigate();
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleYouTubeFetch = async () => {
        if (!youtubeUrl) return;
        setUploading(true);
        try {
            const ytMetadata = await fetchYouTubeMetadata(youtubeUrl);
            await addSong(ytMetadata);
            setUploading(false);
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            alert(`Cloud Save Error: ${error.message || "Please check your internet and Firebase rules."}`);
            setUploading(false);
        }
    };

    return (
        <div className="section-container upload-container animate-fade-in">
            <header>
                <h1 className="hero-title-cinematic">
                    SUBH<span className="text-gradient-cosmic">RIS</span> Launchpad
                </h1>
                <p style={{ color: 'var(--secondary-glow)', fontSize: '18px', letterSpacing: '1px' }}>Deploy your melodies into the personal cosmos</p>
            </header>

            <motion.div 
                className="glass"
                style={{ 
                    padding: '40px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '24px',
                    boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Glow effect */}
                <div style={{ 
                    position: 'absolute', 
                    top: '-50%', 
                    left: '-50%', 
                    width: '200%', 
                    height: '200%', 
                    background: 'radial-gradient(circle, rgba(232, 28, 255, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                {!success ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(232, 28, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FaRocket color="var(--galaxy-pink)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', color: 'white', margin: 0 }}>Cloud Capture</h3>
                                <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: 0 }}>Sync any YouTube frequency directly to the cosmos</p>
                            </div>
                        </div>

                        <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dim)' }}>YouTube Video URL</label>
                            <input 
                                type="text" 
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    background: 'rgba(0,0,0,0.4)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '15px'
                                }}
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleYouTubeFetch}
                            disabled={!youtubeUrl || uploading}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'var(--galaxy-pink)',
                                color: 'black',
                                fontWeight: '900',
                                border: 'none',
                                cursor: 'pointer',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                marginTop: '10px',
                                boxShadow: '0 0 20px rgba(232, 28, 255, 0.3)'
                            }}
                        >
                            {uploading ? "Analyzing Frequency..." : "Capture Track"}
                        </motion.button>
                        
                        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-dim)', opacity: 0.5 }}>
                            The SUBHRIS Cloud will automatically extract high-fidelity metadata.
                        </p>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', padding: '60px 0' }}
                    >
                        <FaCheckCircle size={80} color="var(--galaxy-pink)" style={{ marginBottom: '24px' }} />
                        <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Transmission Successful!</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '18px' }}>The melody has joined your private cosmos.</p>
                        <p style={{ color: 'var(--galaxy-pink)', marginTop: '20px', fontSize: '14px' }}>Redirecting to Home...</p>
                    </motion.div>
                )}
            </motion.div>
            
            <div style={{ marginTop: '40px', padding: '20px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--galaxy-pink)' }}>Cosmic Synchronization Active</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: '1.6' }}>
                    Great news! Your Space Station is now connected to the SUBHRIS Cloud. Any YouTube video you add here will be instantly available across your personal auditory constellation.
                </p>
            </div>
        </div>
    );
};

export default Upload;
