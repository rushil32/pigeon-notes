import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import blockStyles from './blockStyles';
import keyBindings from './keyBindings';
import { EditorState, RichUtils, convertFromRaw } from 'draft-js';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.setDomEditorRef = ref => this.domEditor = ref;
  }

  static propTypes = {
    note: PropTypes.object,
    handleSave: PropTypes.func
  }

  static defaultProps = {
    note: {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const editorState = EditorState.createEmpty();
    
    if (!nextProps.note.text) return { editorState };

    return {
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.note.text)))
    }
  }

  componentDidMount(){
    this.focusEditor();
  }

  focusEditor = () => {
    this.domEditor.focus();
  }

  onChange = (editorState) => {
    this.setState({ editorState });
    this.props.handleInput(editorState);
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === 'myeditor-save') {
      this.props.handleSave(editorState);
      return 'handled';
    }

    // if (command === 'tab-space') {
    //   const newEditorState = RichUtils.onTab(e, this.state.editorState, 4);
    //   if (newEditorState !== this.state.editorState) {
    //     this.onChange(newEditorState);
    //   }
    // }

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  onUnderlineClick = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));

  onBoldClick = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  
  onToggleCode = () => this.onChange(RichUtils.toggleCode(this.state.editorState));

  toolBar = () => (
    <div className="toolbar">
      <button onClick={this.onUnderlineClick}><u>U</u></button>
      <button onClick={this.onBoldClick.bind(this)}><b>B</b></button>
      <button onClick={this.onToggleCode}>&lt;&nbsp;&gt;</button>
    </div>
  )

  render() {
    return (
      <div className="text-area">
        <this.toolBar />
        <div className = "text-area__input" onClick={this.focusEditor}>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={keyBindings}
            onChange={this.onChange}
            blockStyleFn={blockStyles}
            ref={this.setDomEditorRef}
          />
        </div>
      </div>
    );
  }
}

export default TextEditor;
