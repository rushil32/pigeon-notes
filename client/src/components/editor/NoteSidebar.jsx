import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NoteSidebar extends Component {
  static propTypes = {
    notes: PropTypes.object,
    activeNote: PropTypes.object,
    selectNote: PropTypes.func,
    setActiveNote: PropTypes.func,
  }

  static defaultProps = {
    notes: [],
    activeNote: {},
  }

  parseNoteText = (content) => {
    const noteContent = JSON.parse(content);
    return noteContent.blocks[0].text;
  }
  
  isActiveNote = (id) => id === this.props.activeNote;

  noteItem = (note, index, parse = true) => {
    const createdOn = new Date(note.createdOn);

    return (
      <li key={note._id} className={ index === this.props.activeNote ? 'active' : ''}>
        <div onClick={() => this.props.getNote(index)}>
          <h3>{ note.title }</h3>
          <p>{ parse ? this.parseNoteText(note.text) : note.text }</p>
          <p className="timestamp">{ createdOn.toDateString() }</p>
        </div>
      </li>
    )
  }

  noteList = (notes) => notes.map((note, index) => this.noteItem(note, index));

  render() {
    const { notes } = this.props;
    const today = new Date();
    
    return (
      <div className="sidebar note-sidebar">
        <button className="btn btn-block btn-primary" onClick={() => this.props.setActiveNote(-1)}>New note</button>
        <ul>
          { notes.length > 0 && (this.noteList(notes)) }
          { (notes.length === 0) && (this.noteItem({
              title: 'New note',
              text: 'Your first note',
              createdOn: today.toDateString(),
          }, -1, false))}
        </ul>
      </div>
    );
  }
}

export default NoteSidebar;
