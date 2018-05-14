import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextArea from '../text-area';
import NoteSidebar from './NoteSidebar';
import Nav from '../nav';
import * as noteUtil from '../../util/noteHelpers';
import { getRawState, editorHasText } from '../../util/editorHelpers';
import { convertToRaw, convertFromRaw } from 'draft-js';

class Editor extends Component {
  state = {
    notes: [],
    activeNote: -1,
  }

  static propTypes = {
    userData: PropTypes.object,
    setUserData: PropTypes.func
  }

  static defaultProps = {
    userData: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.userData) return prevState;
    if (!nextProps.userData.notes) return prevState;
    
    let notes = nextProps.userData.notes;
    let activeNote = -1;

    if (notes.length) activeNote = 0;
    
    return {
      activeNote,
      notes,
    }
  }

  setActiveNote = (index) => this.setState({ activeNote: index });

  setNoteValue = (index, key, value) => {
    const notes = this.state.notes;
    notes[index][key] = value;
    this.setState({ notes });
  }

  getNote = (index) => {
    const _this = this;
    const { notes } = this.state;
    const noteId = notes[index]._id;

    noteUtil.getNote(noteId)
      .then(res => {
        notes[index] = res;

        _this.setState({
          activeNote: index,
          notes
        })
      });
  }

  deleteNote = () => {
    const _this = this;
    const { notes, activeNote } = this.state;
    
    noteUtil.deleteNote(notes[activeNote]._id)
      .then(res => {
        _this.setState({ notes: res });
      });
  }

  createNote = (note) => {
    const _this = this;

    this.setState(prevState => { notes: prevState.notes.unshift(note) });
    this.setState({ activeNote: 0 });

    noteUtil.createNote(note)
      .then(res => {
        this.setNoteValue(0, '_id', res._id);
      })
  }

  handleInput = (editorState) => {
    const _this = this;
    const { notes, activeNote } = this.state;

    const noteState = {
      title: 'A cool new title',
      text: getRawState(editorState),
      tag: 'ALL'
    }

    if (activeNote !== -1) {
      noteUtil.updateNote(notes[activeNote]._id, noteState);
    } else { 
      editorHasText(editorState) && this.createNote(noteState);
    }
  }

  render() {
    const { userData, setUserData } = this.props;
    const { notes, activeNote } = this.state;
    
    return (
      <div className="editor">
        <div className="container-fluid">
          <div className="row no-gutters">
            { userData.email && (
              <div className="col-lg-3 animated slideInLeft">
                <NoteSidebar
                  notes={notes} 
                  activeNote={activeNote}
                  getNote={this.getNote}
                  setActiveNote={this.setActiveNote}
                />
              </div>
            )}
            <div className="col">
              <Nav userData={userData} setUserData={setUserData} delete={this.deleteNote} />
              <TextArea note={notes[activeNote]} handleInput={this.handleInput} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
