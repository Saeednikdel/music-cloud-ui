import {
  AddAPhoto,
  Download,
  Edit,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  ShortText,
} from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';

import BtnPrimary from '../components/BtnPrimary';
import { connect } from 'react-redux';
import domtoimage from 'dom-to-image';
import { load_card_post } from '../actions/cloud';
import { useParams } from 'react-router-dom';

const CreateCard = ({ load_card_post, card_post }) => {
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
  const [selected, setSelected] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    load_card_post(id);
  }, []);
  useEffect(() => {
    if (card_post) {
      setImage(card_post.artwork);
    }
  }, [card_post]);
  const shot = () => {
    domtoimage.toJpeg(div.current).then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = `${card_post.title + ' - ' + card_post.artist}.jpeg`;
      link.href = dataUrl;
      link.click();
    });
  };
  async function change(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  return (
    card_post && (
      <div dir="ltr" className="pb-32 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex justify-center items-center md:mt-8">
          <div
            ref={div}
            className="w-96 h-96 relative overflow-hidden text-white">
            <img
              alt="album"
              className="w-full h-full object-cover"
              style={{ filter: `brightness(${brightness}%)` }}
              src={image}
            />

            <div
              className="absolute top-5 left-5"
              style={{ color: titleColor }}>
              {card_post.title + ' - ' + card_post.artist}
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
              <p className=" whitespace-pre-line">{selected}</p>
            </div>
            <div className="absolute bottom-4 right-4 w-12">
              <img
                alt="Music Cloud"
                src={`${process.env.REACT_APP_API_URL}/media/logo.png`}
              />
            </div>
          </div>
        </div>
        <div>
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
          <div className="flex flex-col items-center">
            {tab === 'lyrics' && (
              <>
                <div className="flex space-x-10 items-center w-9/12">
                  <h1 className=" font-bold">
                    select (highlight) a portion of lyrics you like and click
                    Done.
                  </h1>
                  <BtnPrimary
                    onClick={() =>
                      setSelected(window.getSelection().toString())
                    }>
                    Done
                  </BtnPrimary>
                </div>
                <div className="p-2 m-1 h-80  overflow-auto">
                  <p dangerouslySetInnerHTML={{ __html: card_post.lyrics }}></p>
                </div>
              </>
            )}
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
      </div>
    )
  );
};
const mapStateToProps = (state) => ({
  card_post: state.cloud.card_post,
});
export default connect(mapStateToProps, {
  load_card_post,
})(CreateCard);
