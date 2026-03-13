import { useMusic } from './context/MusicContext';
import { Card } from './component/ui/songCard';
import { motion } from 'framer-motion';

export const Home = () =>{
    const { allSongs, loading } = useMusic();

    return (
        <div className="home-container" style={{ padding: '40px' }}>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="hero-section-luxe"
            >
                <div className="hero-content">
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="hero-tagline"
                    >
                        <span className="tag-line-decoration"></span>
                        FOR SUBHAJIT & BRISHTI
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="hero-title-cinematic"
                    >
                        Subh<span className="text-gradient-cosmic">ris</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="hero-description-pro"
                    >
                        Your sonic universe, where every track is a star.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="hero-divider-glow"
                    ></motion.div>
                </div>
            </motion.div>
            
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                    Recent Transmissions
                </h2>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                    <div className="loader">SYNCING GALAXY...</div>
                </div>
            ) : (
                <div className="song-grid luxe">
                    {allSongs.map((cur) => (
                        <Card key={cur.id} curSong={cur} />
                    ))}
                </div>
            )}
            
            <div style={{ height: '80px' }}></div>
        </div>
    )
}