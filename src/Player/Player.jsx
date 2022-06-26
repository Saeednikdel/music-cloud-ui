import { useRef, useState, useEffect } from "react";
import PlayerComponent from "./PlayerComponent";
import data from "../data";

const Player = () => {
  const [songs, setSongs] = useState(data);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(data[0]);
  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;
    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
      ct: ct,
    });
  };
  const skiptoNext = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
    if (!isplaying) {
      setisplaying(true);
    }
  };
  const skipBack = () => {
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
    if (!isplaying) {
      setisplaying(true);
    }
  };
  return (
    <div className="fixed top-auto bottom-0 z-50 w-full">
      <audio
        autoPlay
        src={currentSong.url}
        ref={audioElem}
        onTimeUpdate={onPlaying}
        onEnded={skiptoNext}
      />
      <PlayerComponent
        songs={songs}
        setSongs={setSongs}
        skipBack={skipBack}
        skiptoNext={skiptoNext}
        isplaying={isplaying}
        setisplaying={setisplaying}
        audioElem={audioElem}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
};

export default Player;
