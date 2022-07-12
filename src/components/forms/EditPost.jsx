import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import BtnPrimary from '../BtnPrimary';
import TextField from '../TextField';
import { AddPhotoAlternate } from '@mui/icons-material';
import Resizer from 'react-image-file-resizer';
import { useParams } from 'react-router-dom';
import { load_card_post } from '../../actions/cloud';

const EditPost = ({ isAuthenticated, user, load_card_post, card_post }) => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [requestSent, setRequestSent] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [file, setFile] = useState();
  useEffect(() => {
    load_card_post(id);
  }, []);
  useEffect(() => {
    if (card_post) {
      setFile(card_post);
      const blocksFromHTML = convertFromHTML(card_post.lyrics);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
    }
  }, [card_post]);
  const resizeFile = (file, format) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        format,
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file'
      );
    });
  const newimage = async (e) => {
    if (e.target.files[0]) {
      const format = e.target.files[0].type.split('/').pop();
      const image = await resizeFile(e.target.files[0], format);
      setFile({ ...file, image: image });
    }
  };
  const textChange = (e) => {
    setFile({ ...file, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    new_post();
    setRequestSent(true);
  };
  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };
  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  if (isAuthenticated === false) navigate('/login');
  if (card_post && user && card_post.user_name !== user.name) navigate('/');
  return (
    <div className="p-4 pb-32 tex flex flex-col space-y-1">
      <div className="flex justify-end">
        {file && (
          <BtnPrimary
            size="small"
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onSubmit}>
            send
          </BtnPrimary>
        )}
      </div>
      {file && (
        <>
          <div className="flex justify-center">
            <label htmlFor="image-input">
              <input
                accept="image/jpeg,image/png"
                id="image-input"
                onChange={newimage}
                style={{ display: 'none' }}
                type="file"
              />
              <div className="h-32 w-32 relative">
                <img
                  className="h-32 w-32 object-cover"
                  alt="album-art"
                  src={
                    file.image ? URL.createObjectURL(file.image) : file.artwork
                  }
                />
                <AddPhotoAlternate
                  className=" absolute top-12 left-12 rounded p-1 text-white bg-gray-900/50 hover:cursor-pointer"
                  fontSize="large"
                />
              </div>
            </label>
          </div>

          <TextField
            label="title"
            type="text"
            value={file.title ? file.title : ''}
            name="title"
            onChange={textChange}
            placeholder="title"
          />
          <TextField
            label="artist"
            type="text"
            value={file.artist ? file.artist : ''}
            name="artist"
            onChange={textChange}
            placeholder="artist"
          />
          <TextField
            label="album"
            type="text"
            onChange={textChange}
            value={file.album ? file.album : ''}
            name="album"
            placeholder="album"
          />
          <h1>lyrics :</h1>
          <div className="bg-gray-50 dark:bg-gray-700 border border-gray-300 rounded-xl dark:border-gray-500 p-3">
            <InlineStyleControls
              editorState={editorState}
              onToggle={toggleInlineStyle}
            />
            <div className=" border-t border-gray-300 dark:border-gray-500 hover:cursor-text mt-2 pt-2 h-80 overflow-auto">
              <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={mapKeyToEditorCommand}
                onChange={setEditorState}
                spellCheck={true}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );

  async function new_post() {
    let formData = new FormData();
    file.image && formData.append('artwork', file.image);
    formData.append('id', file.id);
    formData.append('user', user.id);
    formData.append('title', file.title);
    formData.append('artist', file.artist && file.artist);
    formData.append('album', file.album && file.album);
    formData.append('lyrics', stateToHTML(editorState.getCurrentContent()));
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cloud/newpost/`,
        formData,
        config
      );
      res.data.id && navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
};

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'hover:cursor-pointer mx-1 inline-block';
    if (this.props.active) {
      className += ' text-blue-600 dark:text-blue-500';
    }
    switch (this.props.label) {
      case 'Bold':
        return <FormatBold className={className} onMouseDown={this.onToggle} />;
      case 'Italic':
        return (
          <FormatItalic className={className} onMouseDown={this.onToggle} />
        );
      case 'Underline':
        return (
          <FormatUnderlined className={className} onMouseDown={this.onToggle} />
        );
      default:
        return (
          <span className={className} onMouseDown={this.onToggle}>
            {this.props.label}
          </span>
        );
    }
  }
}

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  card_post: state.cloud.card_post,
});
export default connect(mapStateToProps, { load_card_post })(EditPost);
