const { useState, useEffect } = React
import { NoteForm } from '../cmps/NoteForm.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { notesService } from '../services/note.service.js'

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    notesService
      .query(filterBy)
      .then((notes) => {
        setNotes(notes)
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }

  function onRemoveNote(noteId) {
    notesService.remove(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
    })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy({ ...filterBy })
  }

  if (!notes) return <div>Loading...</div>
  return (
    <section className="note-container">
      <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <NoteForm />
      <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </section>
  )
}
