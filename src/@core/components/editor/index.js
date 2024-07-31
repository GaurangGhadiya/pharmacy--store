// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import style from './editor.module.css'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

const uploadImageCallBack = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve({ data: { link: reader.result } })
    }
    reader.readAsDataURL(file)
  })
}

const toolbarOptions = {
  options: ['inline', 'blockType', 'list', 'link', 'image'],
  inline: {
    options: ['bold', 'italic', 'underline']
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
  },
  list: {
    options: ['unordered', 'ordered']
  },
  link: {
    options: ['link']
  },
  image: {
    uploadEnabled: true,
    uploadCallback: uploadImageCallBack, // define this function if you need image upload functionality
    previewImage: true,
    alt: { present: false, mandatory: false }
  }
}

const EditorControlled = ({ value, setValue }) => {
  // ** State

  return (
    <ReactDraftWysiwyg
      editorState={value}
      onEditorStateChange={data => setValue(data)}
      toolbarClassName={style.toolbarClassName}
      wrapperClassName={style.wrapperClassName}
      editorClassName={style.editorClassName}
      toolbar={toolbarOptions}
    />
  )
}

export default EditorControlled
