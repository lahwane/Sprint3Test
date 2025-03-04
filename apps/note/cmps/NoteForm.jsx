const { useState } = React

const noteTypes = ['text', 'image', 'todos']

export function NoteForm() {
  const [someValue, setSomeValue] = useState(noteTypes[0])
  const [userInput, setUserInput] = useState('')

  function onSetNoteType(noteType) {
    console.log('noteType:', noteType)
    setSomeValue(noteType)
  }

  function onHandleChange(ev) {
    setUserInput(ev.target.value)
  }

  return (
    <section className="note-form" style={{ border: '1px solid red' }}>
      <div className="items-container">
        <input
          onChange={onHandleChange}
          value={userInput}
          type="text"
          placeholder={`Enter ${someValue.toUpperCase()} URL`}
        />

        {noteTypes.map((noteType) => (
          <button key={noteType} onClick={() => onSetNoteType(noteType)}>
            {noteType}
          </button>
        ))}
      </div>
    </section>
  )
}
