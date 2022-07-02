import React from 'react';
import { VolumeOff, VolumeUp } from '@mui/icons-material';
const VolumePopUp = ({ showVolume, volume, isMuted, mute, changeVolume }) => {
  return (
    <div
      className={`${
        showVolume ? 'block' : 'hidden'
      } absolute bg-white dark:bg-slate-900 border bottom-8 right-0 border-gray-300 dark:border-gray-600 mb-2 p-2 rounded-lg z-10 shadow-lg`}>
      <div className="flex space-x-4 justify-end items-center">
        <input
          className="seekbar h-1 w-32 bg-blue-200 dark:bg-slate-600 appearance-none rounded"
          min={0}
          max={100}
          value={volume}
          type="range"
          onChange={changeVolume}
        />
        <p className="w-6">{Math.floor(volume)}</p>
        {isMuted ? (
          <VolumeOff
            fontSize="large"
            className=" hover:cursor-pointer active:text-blue-600"
            onClick={mute}
          />
        ) : (
          <VolumeUp
            fontSize="large"
            className=" hover:cursor-pointer active:text-blue-600"
            onClick={mute}
          />
        )}
      </div>
    </div>
  );
};

export default VolumePopUp;
