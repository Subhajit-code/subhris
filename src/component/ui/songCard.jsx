import { FaPlay } from "react-icons/fa";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useMusic } from "../../context/MusicContext";
import { AiOutlineHeart } from "react-icons/ai";

export const Card = ({ curSong }) => {
  const { image, songname, artistName } = curSong;
  const { playSong } = useMusic();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      className="song-card-luxe"
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      onClick={() => playSong(curSong)}
    >
      <div className="card-glass-glow"></div>
      <div className="poster-container-luxe">
        <img src={image} className="poster-luxe" alt={songname} />
        <div className="play-overlay-luxe">
          <motion.div 
            whileHover={{ scale: 1.2, rotate: 360 }}
            className="play-btn-pro"
          >
            <FaPlay size={18} color="black" />
          </motion.div>
        </div>
      </div>
      <div className="song-details-luxe">
        <h3 className="song-name-pro">{songname}</h3>
        <p className="artist-name-pro">{artistName}</p>
      </div>
    </motion.div>
  );
};


