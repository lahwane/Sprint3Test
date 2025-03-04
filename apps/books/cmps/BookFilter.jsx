const { useEffect, useState } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    useEffect(() => {
        onSetFilterBy(filterByToEdit)

    }, [filterByToEdit])
    
    function onHandleChange({ target }) {
        let { name: field, type, value } = target
        if (type === 'number') value = +value || ''
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form >
                <label htmlFor="txt">Title</label>
                <input
                    name="title"
                    value={filterByToEdit.title}
                    onChange={onHandleChange}
                    type="text"
                    id="txt"
                />

                <label htmlFor="amount">Min Price</label>
                <input
                    name="amount"
                    value={filterByToEdit.amount}
                    onChange={onHandleChange}
                    type="number"
                    id="amount"
                />
            </form>
        </section>
    )

}