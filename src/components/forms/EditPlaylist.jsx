import React, { useState } from 'react';
import TextField from '../TextField';
import BtnPrimary from '../BtnPrimary';

const EditPlaylist = ({ title_old, new_playlist }) => {
  const [title, setTitle] = useState(title_old);
  return (
    <div className=" space-y-8">
      <div>
        <TextField
          label="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <BtnPrimary onClick={() => new_playlist(title)}>Ok</BtnPrimary>
    </div>
  );
};

export default EditPlaylist;
