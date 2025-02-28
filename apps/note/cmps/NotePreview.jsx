import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'

export function NotePreview({ note }) {
  return (
    <article className="note-prev">
      <NoteTxt note={note} />
      <NoteImg note={note} />
    </article>
  )
}
