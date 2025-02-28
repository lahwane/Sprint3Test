const { useState, useEffect } = React

import { NoteList } from '../cmps/NoteList.jsx'
import { notesService } from '../services/note.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())
  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    notesService.query(filterBy).then(setNotes)
  }

  return (
    <div className="container">
      <h2>Notes list</h2>
      <NoteList notes={notes} />
    </div>
  )
}
