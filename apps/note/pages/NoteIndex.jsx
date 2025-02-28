const { useState, useEffect } = React

import { notesService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    notesService.query().then(setNotes)
  }

  return (
    <div className=" notes-container">
      <h2>Notes list</h2>
      <NoteList notes={notes} />
    </div>
  )
}
