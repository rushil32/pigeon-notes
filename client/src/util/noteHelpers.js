import axios from 'axios';

export function createNote(newNote) {
  return new Promise((resolve, reject) => {
    const { title, text, tag } = newNote;

    axios.post('/api/notes/', {
      title,
      text,
      tag,
    }).then((response) => {
      resolve(response.data);
    }, error => reject(error));
  });
}

export function updateNote(id, updatedNote) {
  return new Promise((resolve, reject) => {
    const { title, text, tag } = updatedNote;

    axios.put(`/api/notes/${id}`, {
      title,
      text,
      tag,
    }).then((response) => {
      resolve(response.data);
    }, error => reject(error));
  });
}

export function getNote(id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/notes/${id}`)
      .then((response) => {
        resolve(response.data);
      }, error => reject(error));
  });
}

export function deleteNote(id) {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/notes/${id}`)
      .then((response) => {
        resolve(response.data);
      }, error => reject(error));
  });
}
