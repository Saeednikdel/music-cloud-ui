import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import domtoimage from 'dom-to-image';
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
import { connect } from 'react-redux';
import { load_card_post } from '../actions/cloud';

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
  const [lyric, setLyric] = useState([]);
  const [selected, setSelected] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    load_card_post(id);
  }, []);
  useEffect(() => {
    if (card_post) {
      const lyrics = card_post.lyrics.replaceAll('</p>', '<p>').split('<p>');
      setSelected(lyrics[1]);
      setLyric(lyrics);
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
              <p dangerouslySetInnerHTML={{ __html: selected }}></p>
            </div>
            <div className="absolute bottom-4 right-4 bg-gray-900/50 p-1 rounded-md w-12">
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
          <div className="flex flex-col items-center h-80 overflow-auto">
            {tab === 'lyrics' &&
              lyric.map(
                (line, i) =>
                  line !== '\r\n' && (
                    <div
                      key={i}
                      className=" hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 p-2 m-1"
                      onClick={() => setSelected(line)}>
                      <p dangerouslySetInnerHTML={{ __html: line }}></p>
                    </div>
                  )
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
