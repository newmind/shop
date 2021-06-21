
import { unemojify } from "node-emoji";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";

import List from './List';
import Blocks from './Blocks';
import Styles from './Styles';
import TextAlign from './TextAlign';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from './defaults.module.scss';


function EditorHTML({ value, onChange }) {
  const [isFirst, setFirst] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (isFirst) {
      return void 0;
    }

    const newValue = unemojify(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    if (value && value !== newValue) {
      const blocks = convertFromHTML(value);
      const content = ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap);

      setFirst(true);

      const newValue = unemojify(draftToHtml(convertToRaw(content)));
      onChange(newValue);

      setEditorState(EditorState.createWithContent(content));
    }
  }, [value]);

  function onEditorStateChange(editorState) {
    const newValue = unemojify(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    if (value !== newValue) {
      onChange(newValue);
    }

    setEditorState(editorState);
  }

  return (
    <Editor
      editorState={editorState}
      wrapperClassName={styles['wrapper']}
      toolbarClassName={styles['toolbar']}
      editorClassName={styles['content']}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: ['inline', 'blockType', 'list', 'textAlign'], // 'link', 'image', 'history'],
        blockType: { component: Blocks },
        inline: { component: Styles },
        list: { component: List },
        textAlign: { component: TextAlign },
      }}
    />
  );
}

export default EditorHTML;
