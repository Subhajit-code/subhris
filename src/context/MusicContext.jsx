import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { db } from '../firebase';
import { ref, push, set, onValue, query, orderByChild, remove } from 'firebase/database';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [allSongs, setAllSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [showVideo, setShowVideo] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const loginAdmin = () => setIsAdmin(true);
    const logoutAdmin = () => setIsAdmin(false);
    const audioRef = useRef(new Audio());

    const addSong = async (song) => {
        try {
            console.log("MusicContext: Transmitting to Cloud (RTDB)...", song.songname);
            const songRef = ref(db, 'songs');
            const newSongRef = push(songRef);
            await set(newSongRef, {
                ...song,
                createdAt: Date.now()
            });
            console.log("MusicContext: Cloud Delivery Successful! ID:", newSongRef.key);
        } catch (error) {
            console.error("CRITICAL: Cloud Transmission Failed!", error);
            throw error;
        }
    };

    const removeSong = async (songId) => {
        try {
            console.log("MusicContext: Deleting song...", songId);
            await remove(ref(db, `songs/${songId}`));
            console.log("MusicContext: Song deleted successfully");
        } catch (error) {
            console.error("Error deleting song:", error);
        }
    };

    // Removed Saavn formatting logic

    const fetchYouTubeMetadata = async (url) => {
        try {
            // Robust regex for various YouTube URL formats
            const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            const videoId = videoIdMatch ? videoIdMatch[1] : null;
            
            if (!videoId) throw new Error("Invalid YouTube URL");

            let title = "YouTube Song";
            let author = "YouTube Artist";

            try {
                const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
                const data = await response.json();
                if (data.title) title = data.title;
                if (data.author_name) author = data.author_name;
            } catch (e) {
                console.warn("Metadata fetch failed, using defaults", e);
            }
            
            return {
                id: `yt-${videoId}`,
                songname: title,
                artistName: author,
                image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                filePath: url,
                isYouTube: true,
                duration: 0
            };
        } catch (error) {
            console.error("YouTube fetch failed:", error);
            throw error;
        }
    };

    const searchSongs = async (query) => {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        return allSongs.filter(song => 
            song.songname.toLowerCase().includes(lowerQuery) || 
            song.artistName.toLowerCase().includes(lowerQuery)
        );
    };

    const playSong = (song) => {
        if (currentSong?.id === song.id) {
            if (song.isYouTube) setShowVideo(true);
            togglePlay();
        } else {
            setCurrentSong(song);
            if (!song.isYouTube) {
                audioRef.current.src = song.filePath;
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
            } else {
                setShowVideo(true);
            }
            setIsPlaying(true);
        }
    };
    
    useEffect(() => {
        const songsRef = query(ref(db, 'songs'), orderByChild('createdAt'));
        const unsubscribe = onValue(songsRef, (snapshot) => {
            const songs = [];
            snapshot.forEach((childSnapshot) => {
                songs.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            // Reverse to show newest first
            const reversedSongs = songs.reverse();
            console.log("MusicContextSync: Received from Cloud:", reversedSongs.length);
            setAllSongs(reversedSongs);
        }, (error) => {
            console.error("MusicContextSync: Connection Error!", error);
        });

        return () => unsubscribe();
    }, []);

    const togglePlay = () => {
        if (!currentSong?.isYouTube) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audio = audioRef.current;
        
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleDurationChange = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('durationchange', handleDurationChange);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('durationchange', handleDurationChange);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const seek = (time) => {
        if (!currentSong?.isYouTube) {
            audioRef.current.currentTime = time;
        }
        setCurrentTime(time);
    };

    return (
        <MusicContext.Provider value={{
            currentSong,
            allSongs,
            loading,
            isPlaying,
            currentTime,
            duration,
            volume,
            setVolume,
            playSong,
            togglePlay,
            seek,
            setCurrentSong,
            searchSongs,
            addSong,
            removeSong,
            fetchYouTubeMetadata,
            setCurrentTime,
            setDuration,
            setIsPlaying,
            showVideo,
            setShowVideo,
            isAdmin,
            loginAdmin,
            logoutAdmin
        }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => useContext(MusicContext);
