export function NoteTodos({ note }) {
  const { info } = note
  const { todos } = info

  const renderTodos = () => {
    return (
      <section>
        <h3>{info.title}</h3>
        <div className="note-todos">
          {todos.map((todo, index) => {
            return <li key={index + todo.txt}>{todo.txt}</li>
          })}
        </div>
      </section>
    )
  }

  return renderTodos()
}
