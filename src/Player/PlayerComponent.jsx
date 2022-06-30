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

const PlayerComponent = ({
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
    <div className="py-2 px-4 md:px-16 xl:px-36 2xl:px-60 backdrop-blur-2xl  backdrop-brightness-200 dark:backdrop-brightness-50 shadow-sm border-1 text-center text-gray-900 dark:text-gray-300">
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
          <p className=" font-bold">
            {currentSong.title + ' - ' + currentSong.artist}
          </p>
          <div className=" flex text-sm  justify-between -mb-2">
            <p>
              {currentSong.ct
                ? Math.floor(currentSong.ct / 60) +
                  ':' +
                  Math.floor(currentSong.ct % 60)
                : '0:0'}
            </p>
            <p>
              {currentSong.length
                ? Math.floor(currentSong.length / 60) +
                  ':' +
                  Math.floor(currentSong.length % 60)
                : '0:0'}
            </p>
          </div>
          <input
            className="seekbar h-1 w-full bg-blue-200 dark:bg-slate-600 appearance-none rounded"
            min={0}
            max={100}
            value={currentSong.progress}
            type="range"
            onChange={seek}
          />

          <div className="flex justify-between mt-2 ">
            <div className="flex space-x-4">
              <SkipPrevious
                className=" hover:cursor-pointer"
                onClick={skipBack}
              />
              {isplaying ? (
                <Pause
                  className=" hover:cursor-pointer"
                  onClick={() => setisplaying(false)}
                />
              ) : (
                <PlayArrow
                  className=" hover:cursor-pointer"
                  onClick={() => setisplaying(true)}
                />
              )}
              <SkipNext
                className=" hover:cursor-pointer"
                onClick={skiptoNext}
              />
            </div>
            <div className=" flex justify-end">
              <div className=" relative inline-block">
                <OutsideClickHandler
                  disabled={!showVolume}
                  onOutsideClick={() => setShowVolume(!showVolume)}>
                  {isMuted ? (
                    <VolumeOff
                      className=" hover:cursor-pointer"
                      onClick={() => setShowVolume(!showVolume)}
                    />
                  ) : (
                    <VolumeUp
                      className=" hover:cursor-pointer"
                      onClick={() => setShowVolume(!showVolume)}
                    />
                  )}
                  <div
                    className={`${
                      showVolume ? 'block' : 'hidden'
                    } absolute bg-white dark:bg-slate-900 border bottom-5 right-0 border-gray-300 dark:border-gray-600 mb-2 p-2 rounded-lg z-10 bo shadow-lg`}>
                    <div className="flex space-x-4 justify-end items-center">
                      <input
                        className="seekbar h-1 w-28 bg-blue-200 dark:bg-slate-600 appearance-none rounded"
                        min={0}
                        max={100}
                        value={volume}
                        type="range"
                        onChange={changeVolume}
                      />
                      <p className="w-6">{Math.floor(volume)}</p>

                      {isMuted ? (
                        <VolumeOff
                          className=" hover:cursor-pointer"
                          onClick={mute}
                        />
                      ) : (
                        <VolumeUp
                          className=" hover:cursor-pointer"
                          onClick={mute}
                        />
                      )}
                    </div>
                  </div>
                </OutsideClickHandler>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerComponent;
