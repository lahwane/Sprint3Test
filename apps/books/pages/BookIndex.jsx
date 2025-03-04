import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.services.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM


export function BookIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [books, setBooks] = useState(null)

    const titleParam = searchParams.get('title') || ''
    const amountParam = searchParams.get('amount') || ''

    // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter)
    const [filterBy, setFilterBy] = useState({ title: titleParam, amount: amountParam })

    useEffect(() => {
        setSearchParams(filterBy)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                console.log('books', books)
                setBooks(books)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
        // setSearchParams(filterBy)

    }

    function onRemoveBook(bookId) {

        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks =>
                    prevBooks.filter(book => book.id !== bookId)
                )
                showSuccessMsg('Book removed successfully!')
            })
            .catch(() => {
                showErrorMsg(`Couldn't remove book`)
            })
    }

    if (!books) return 'Loading..'
    return (
        <section className="book-index">
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            <BookList books={books} onRemoveBook={onRemoveBook}
            />
        </section>
    )
}
