export function NoteTxt({ note }) {
  const { info } = note

  return (
    <section>
      <p>{info.txt}</p>
    </section>
  )
}
