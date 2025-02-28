import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const NOTE_KEY = 'noteDB'
_createNotes()

export const notesService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    console.log('notes:', notes)

    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => regExp.test(note.txt))
    }
    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote(type = '', txt = '', backgroundColor = '', info = '') {
  return {
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#00d',
    },
    info: {
      txt: 'Fullstack Me Baby!',
    },
  }
}

function getDefaultFilter() {
  return { type: '', isPinned: '' }
}
function _createNotes() {
  const noteType = ['NoteTxt', 'NoteImg', 'NoteTodos']
  const notes = [
    {
      id: 'n101',
      createdAt: 1112222,
      type: 'NoteTxt',
      isPinned: true,
      style: {
        backgroundColor: '#00d',
      },
      info: {
        txt: 'Fullstack Me Baby!',
      },
    },
    {
      id: 'n102',
      createdAt: 1112223,
      type: 'NoteImg',
      isPinned: false,
      info: {
        url: 'assets/img/15.jpg',
        title: 'Bobi and Me',
      },
      style: {
        backgroundColor: '#00d',
      },
    },
    {
      id: 'n103',
      createdAt: 1112224,
      type: 'NoteTodos',
      isPinned: false,
      info: {
        title: 'Get my stuff together',
        todos: [
          { txt: 'Driving license', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 },
        ],
      },
    },
  ]
  utilService.saveToStorage(NOTE_KEY, notes)
}

//   type: [noteType[utilService.getRandomIntInclusive(0, noteType.length - 1)]],
// const notes = [
//   {
//     id: 'n101',
//     createdAt: 1112222,
//     type: 'NoteTxt',
//     isPinned: true,
//     style: {
//       backgroundColor: '#00d',
//     },
//     info: {
//       txt: 'Fullstack Me Baby!',
//     },
//   },
//   {
//     id: 'n102',
//     createdAt: 1112223,
//     type: 'NoteImg',
//     isPinned: false,
//     info: {
//       url: 'http://some-img/me',
//       title: 'Bobi and Me',
//     },
//     style: {
//       backgroundColor: '#00d',
//     },
//   },
//   {
//     id: 'n103',
//     createdAt: 1112224,
//     type: 'NoteTodos',
//     isPinned: false,
//     info: {
//       title: 'Get my stuff together',
//       todos: [
//         { txt: 'Driving license', doneAt: null },
//         { txt: 'Coding power', doneAt: 187111111 },
//       ],
//     },
//   },
// ]
