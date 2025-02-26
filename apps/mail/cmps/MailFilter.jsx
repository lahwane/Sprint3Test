const { useEffect, useState } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange({ target }) {
        let { name: field, type, value } = target
        // if (type === 'number') value = +value || ''
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }
    return (
        <section className="mail-filter-container">
            <form >
                <label htmlFor="searchTxt"></label>
                <input
                    id="searchTxt"
                    type="text"
                    placeholder="Search"
                    name="txt"
                    value={filterByToEdit.txt}
                    onChange={onHandleChange}
                />
            </form>
        </section>
    )
}