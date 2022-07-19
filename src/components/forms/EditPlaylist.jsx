import React, { useState } from 'react';

import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';
import translate from '../../translate';

const EditPlaylist = ({ title_old, new_playlist }) => {
  const [title, setTitle] = useState(title_old);
  return (
    <div className=" space-y-8">
      <div>
        <TextField
          label={translate('title')}
          placeholder={translate('title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="text-center">
        <BtnPrimary onClick={() => new_playlist(title)}>
          {translate('ok')}
        </BtnPrimary>
      </div>
    </div>
  );
};

export default EditPlaylist;
