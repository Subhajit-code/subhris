import React, { useState, useRef } from 'react';

export const SongCard = ({ SongData, onChangeSong }) => {
  const { image, songname, artistName, id, filePath } = SongData;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="menu_song">
      <ul>
        <li className="songItem">
          <span>{id}</span>
          <img src={image} alt={songname} />
          <h5>
            {songname} <br />
            <div className="subtitle">{artistName}</div>
          </h5>
          <audio ref={audioRef} src={filePath} />
        </li>
      </ul>
    </div>
  );
};
