import React, { useState, useEffect } from "react";
import { Card } from './component/ui/songCard';
import { FaSearch } from "react-icons/fa";
import { useMusic } from "./context/MusicContext";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const { searchSongs, loading } = useMusic();

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.trim()) {
                const songs = await searchSongs(query);
                setResults(songs);
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query, searchSongs]);

    return (
        <div className="section-container animate-fade-in">
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <FaSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#b3b3b3' }} />
                    <input 
                        type="text" 
                        placeholder="Search your personal cosmic collection..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px 12px 48px',
                            borderRadius: '500px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--galaxy-pink)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                </div>
            </div>

            <h1 style={{ textShadow: '0 0 15px rgba(64, 201, 255, 0.5)' }}>
                {query ? `Scanning universe for "${query}"` : "Explore the Nebulae"}
            </h1>
            
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '80px', color: 'var(--galaxy-pink)' }}>
                    <div className="loader">Searching through light-years...</div>
                </div>
            ) : (
                <div className="song-grid">
                    {results.length > 0 ? (
                        results.map((cur) => (
                            <Card key={cur.id} curSong={cur} />
                        ))
                    ) : query && !loading ? (
                        <p style={{ color: '#b3b3b3', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>No stars found with that name.</p>
                    ) : (
                        <p style={{ color: '#b3b3b3', gridColumn: '1/-1', textAlign: 'center', padding: '100px', fontSize: '18px' }}>
                            Type to find Hindi and English songs from across the cosmic library.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
