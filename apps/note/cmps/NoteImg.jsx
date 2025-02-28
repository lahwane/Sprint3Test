export function NoteImg({ note }) {
  const { info } = note

  return (
    <section>
      <h2>{info.title}</h2>
      <img className="Note-img" src={info.url} alt="" />
    </section>
  )
}
