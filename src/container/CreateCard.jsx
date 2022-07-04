import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { saveAsPng } from 'save-html-as-image';
import {
  Download,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  AddAPhoto,
  Edit,
  ShortText,
} from '@mui/icons-material';
import data from '../data';

const CreateCard = () => {
  const div = useRef();
  let { id } = useParams();
  const [rtl, setRtl] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [italic, setItalic] = useState(false);
  const [bold, setBold] = useState(false);
  const [tab, setTab] = useState('lyrics');
  const [fontSize, setFontSize] = useState(25);
  const [position, setPosition] = useState(100);
  const [brightness, setBrightness] = useState(50);
  const [titleColor, setTitleColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#ffffff');
  const song = data[id];
  const lyric = song.lyrics.split('<br/>');
  const [selected, setSelected] = useState(lyric[1]);
  const [image, setImage] = useState(song.artwork[0].src);
  const shot = () => {
    saveAsPng(div.current, { filename: 'Music Cloud', printDate: true });
  };
  async function change(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div dir="ltr" className="pb-20">
      <div className="flex justify-center items-center md:mt-8">
        <div ref={div} className="relative overflow-hidden text-white">
          <img
            alt="album"
            className="w-80 h-80 md:w-96 md:h-96 object-cover"
            style={{ filter: `brightness(${brightness}%)` }}
            src={image}
          />

          <div className="absolute top-5 left-5" style={{ color: titleColor }}>
            {song.title + ' - ' + song.artist}
          </div>
          <div
            className="absolute"
            style={{
              left: !rtl && '20px',
              right: rtl && '20px',
              textAlign: rtl ? 'right' : 'left',
              fontSize: fontSize + 'px',
              top: position + 'px',
              fontWeight: bold && 'bold',
              fontStyle: italic && 'italic',
              textDecoration: underline && 'underline',
              color: textColor,
            }}>
            {selected}
          </div>
          <div className="absolute bottom-4 right-4 bg-gray-900/50 py-1 px-3 rounded-md w-28">
            Music Cloud
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => setTab('lyrics')}
          className={`${
            tab === 'lyrics' && 'border-b-2 border-blue-600'
          } p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700`}>
          <ShortText />
        </button>
        <button
          onClick={() => setTab('edit')}
          className={`${
            tab === 'edit' && 'border-b-2 border-blue-600'
          } p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700`}>
          <Edit />
        </button>
        <button
          onClick={shot}
          className="p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
          <Download />
        </button>
        <label htmlFor="file-input">
          <input
            id="file-input"
            className="hidden"
            type="file"
            onChange={change}
          />
          <p className="p-4 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700">
            <AddAPhoto />
          </p>
        </label>
      </div>
      <div className="flex flex-col items-center h-80 overflow-auto">
        {tab === 'lyrics' &&
          lyric.map((line, i) => (
            <div
              key={i}
              className=" hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 p-2 m-1"
              onClick={() => setSelected(line)}>
              {line}
            </div>
          ))}
        {tab === 'edit' && (
          <div className="py-6 space-y-2 w-60">
            <div className="flex justify-between">
              <FormatAlignLeft
                className="hover:cursor-pointer"
                onClick={() => setRtl(false)}
              />
              <FormatUnderlined
                className="hover:cursor-pointer"
                onClick={() => setUnderline(!underline)}
              />
              <FormatItalic
                className="hover:cursor-pointer"
                onClick={() => setItalic(!italic)}
              />
              <FormatBold
                className="hover:cursor-pointer"
                onClick={() => setBold(!bold)}
              />
              <FormatAlignRight
                className="hover:cursor-pointer"
                onClick={() => setRtl(true)}
              />
            </div>
            <p>colors:</p>
            <div className=" space-x-4">
              <input
                className="dark:bg-slate-800"
                type="color"
                id="title"
                value={titleColor}
                onChange={(e) => setTitleColor(e.target.value)}
              />
              <label htmlFor="title">title</label>
              <input
                className="dark:bg-slate-800"
                type="color"
                id="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
              <label htmlFor="text">text</label>
            </div>
            <p>font size</p>
            <input
              className="seekbar w-full h-1 bg-blue-200 dark:bg-slate-600 appearance-none rounded"
              type="range"
              min={15}
              max={40}
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
            <p>brightness</p>
            <input
              className="seekbar w-full h-1 bg-blue-200 dark:bg-slate-600 appearance-none rounded"
              type="range"
              min={10}
              max={100}
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
            />
            <p>position</p>
            <input
              className="seekbar w-full h-1 bg-blue-200 dark:bg-slate-600 appearance-none rounded"
              type="range"
              min={50}
              max={300}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCard;
