import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {
  return (
    <section className="note-list">
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <NotePreview note={note} />
            <section>
              <button onClick={() => onRemoveNote(note.id)}>Remove</button>
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}
