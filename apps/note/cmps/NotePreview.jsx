export function NotePreview({ note }) {
  const { info } = note
  return (
    <article className="note-prev">
      <h3>{info.txt}</h3>
    </article>
  )
}
