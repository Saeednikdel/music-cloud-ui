import React, { useState } from 'react';
import parseAudioMetadata from 'parse-audio-metadata';
import { AddAPhotoTwoTone } from '@mui/icons-material';

const New = () => {
  const [file, setFile] = useState();
  async function change(e) {
    const meta = await parseAudioMetadata(e.target.files[0]);
    setFile(meta);
  }

  return (
    <div className="p-4 pb-20 tex flex flex-col items-center space-y-4">
      <label htmlFor="file-input">
        <input
          id="file-input"
          className="hidden"
          type="file"
          onChange={change}
        />
        <p className="bg-blue-600 text-white px-4 py-2 w-fit mb-4 rounded-full shadow">
          choose file
        </p>
      </label>

      {file && (
        <>
          <label htmlFor="image-input">
            <input
              accept="image/*"
              id="image-input"
              // multiple
              style={{ display: 'none' }}
              type="file"
            />
            {file.picture ? (
              <img
                className="h-32 w-32 object-cover"
                alt="album-art"
                src={URL.createObjectURL(file.picture)}
              />
            ) : (
              <AddAPhotoTwoTone fontSize="large" />
            )}
          </label>

          <input
            type="text"
            defaultValue={file.title}
            className="h-8 rounded-full border border-gray-600 dark:border-gray-300 bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400 px-4 focus:outline-none w-auto"
            placeholder="title"
          />
          <input
            type="text"
            defaultValue={file.artist}
            className="h-8 rounded-full border border-gray-600 dark:border-gray-300 bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400 px-4 focus:outline-none w-auto"
            placeholder="artist"
          />
          <input
            type="text"
            defaultValue={file.album}
            className="h-8 rounded-full border border-gray-600 dark:border-gray-300 bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400 px-4 focus:outline-none w-auto"
            placeholder="album"
          />
        </>
      )}
    </div>
  );
};

export default New;
