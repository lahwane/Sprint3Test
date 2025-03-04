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

function getEmptyNote(type = '', backgroundColor = '', info = '') {
  return {
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#00d',
    },
    info: {},
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
      createdAt: 111276222,
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
      createdAt: 1112226763,
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
      createdAt: 1112227865,
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
    {
      id: 'n104',
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
      id: 'n105',
      createdAt: 11122333523,
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
      id: 'n106',
      createdAt: 111222774,
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
    {
      id: 'n107',
      createdAt: 11124356222,
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
      id: 'n108',
      createdAt: 1112343223,
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
      id: 'n109',
      createdAt: 111224524,
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
