import React, { useState } from 'react';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import OutsideClickHandler from 'react-outside-click-handler';
import VolumePopUp from '../components/VolumePopUp';

const PlayerSimple = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  skipBack,
  skiptoNext,
  setFullPlayer,
}) => {
  const [showVolume, setShowVolume] = useState(false);
  const [isMuted, setIsMuted] = useState(
    audioElem.current && audioElem.current.muted
  );
  const [volume, setVolume] = useState(
    audioElem.current && audioElem.current.volume * 100
  );

  const seek = (e) => {
    audioElem.current.currentTime = (e.target.value / 100) * currentSong.length;
  };
  const changeVolume = (e) => {
    let vol = e.target.value / 100;
    if (vol === 0) {
      audioElem.current.muted = true;
      setIsMuted(true);
    } else if (audioElem.current.muted) {
      audioElem.current.muted = false;
      setIsMuted(false);
    }
    setVolume(vol * 100);
    audioElem.current.volume = vol;
  };
  const mute = () => {
    if (audioElem.current.volume === 0) {
      audioElem.current.volume = 0.2;
      setVolume(20);
      audioElem.current.muted = false;
      setIsMuted(false);
    } else {
      audioElem.current.muted = !audioElem.current.muted;
      setIsMuted(!isMuted);
    }
  };
  return (
    <div className="pt-1 pb-2 px-4 md:px-16 xl:px-36 2xl:px-60 backdrop-blur-2xl  backdrop-brightness-200 dark:backdrop-brightness-50 shadow-sm border-1 text-gray-900 dark:text-gray-300">
      <div className="flex space-x-4 items-center">
        <div className="h-20 w-20 flex items-center justify-center">
          <img
            alt="album art"
            onClick={() => setFullPlayer(true)}
            src={currentSong.artwork[0].src}
            className={`rounded shadow-xl transform transition hover:cursor-pointer ${
              !isplaying ? 'grayscale scale-90' : 'scale-1'
            }`}
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center -mb-2">
            <div>
              <p className=" sm:hidden font-bold text">
                {currentSong.title.length > 15
                  ? currentSong.title.slice(0, 15) + '...'
                  : currentSong.title}
              </p>
              <p className="hidden sm:block font-bold">
                {currentSong.title.length > 35
                  ? currentSong.title.slice(0, 35) + '...'
                  : currentSong.title}
              </p>

              <p className=" sm:hidden">
                {currentSong.artist.length > 15
                  ? currentSong.artist.slice(0, 15) + '...'
                  : currentSong.artist}
              </p>
              <p className="hidden sm:block">
                {currentSong.artist.length > 35
                  ? currentSong.artist.slice(0, 35) + '...'
                  : currentSong.artist}
              </p>
            </div>
            <div className=" flex justify-end">
              <div className="flex space-x-4 ">
                <div className="hidden sm:block">
                  <SkipPrevious
                    fontSize="large"
                    className=" hover:cursor-pointer active:text-blue-600 "
                    onClick={skipBack}
                  />
                </div>
                {isplaying ? (
                  <Pause
                    fontSize="large"
                    className=" hover:cursor-pointer active:text-blue-600"
                    onClick={() => setisplaying(false)}
                  />
                ) : (
                  <PlayArrow
                    fontSize="large"
                    className=" hover:cursor-pointer active:text-blue-600"
                    onClick={() => setisplaying(true)}
                  />
                )}
                <div className="hidden sm:block">
                  <SkipNext
                    fontSize="large"
                    className=" hover:cursor-pointer active:text-blue-600"
                    onClick={skiptoNext}
                  />
                </div>
                <div className=" relative hidden sm:inline-block">
                  <OutsideClickHandler
                    disabled={!showVolume}
                    onOutsideClick={() => setShowVolume(!showVolume)}>
                    {isMuted ? (
                      <VolumeOff
                        fontSize="large"
                        className=" hover:cursor-pointer"
                        onClick={() => setShowVolume(!showVolume)}
                      />
                    ) : (
                      <VolumeUp
                        fontSize="large"
                        className=" hover:cursor-pointer"
                        onClick={() => setShowVolume(!showVolume)}
                      />
                    )}
                    <VolumePopUp
                      mute={mute}
                      isMuted={isMuted}
                      volume={volume}
                      showVolume={showVolume}
                      changeVolume={changeVolume}
                    />
                  </OutsideClickHandler>
                </div>
              </div>
            </div>
          </div>

          <input
            className="seekbar h-1 w-full bg-blue-200 dark:bg-slate-600 appearance-none rounded"
            min={0}
            max={100}
            value={currentSong.progress}
            type="range"
            onChange={seek}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerSimple;