export function NoteImg({ note }) {
  const { info } = note

  return (
    <section>
      <h2>{info.title}</h2>
      <img className="note-img" src={info.url} alt="" />
    </section>
  )
}
