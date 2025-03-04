const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"

import { bookService } from "../services/book.services.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { bookId } = useParams()

    useEffect(() => {
        if (!bookId) return
        else {
            bookService.getById(bookId)
                .then(bookToEdit => setBookToEdit(bookToEdit))
        }
    }, [bookId])

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (field) {
            case 'title':
                value = target.value || bookToEdit.title
                break
            case 'price':
                if (value !== '') value = +target.value || bookToEdit.listPrice.amount
                break
            case 'authors':
                value = value || bookToEdit.authors
                break
            case 'description':
                value = value || bookToEdit.description
                break
            case 'pages':
                if (value !== '') value = +value || bookToEdit.pageCount

                break
            case 'isOnSale':
                value = target.checked
                break
            default:
                break
        }

        if (field === 'price') {
            setBookToEdit((prevBook) => ({
                ...prevBook, listPrice: { ...prevBook.listPrice, amount: value }
            }))
        } else if (field === 'pages') {
            setBookToEdit((prevBook) => ({
                ...prevBook, pageCount: value
            }))
        }
        else {
            setBookToEdit(prevBook => ({
                ...prevBook,
                [field]: value
            }))
        }
    }

    const navigate = useNavigate()

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(savedBook => {
                console.log('savedBook', savedBook)
                showSuccessMsg('Book added succesfully')
                navigate('/books')
            })
    }

    const { title,
        subtitle,
        authors,
        description,
        pageCount,
        language,
        categories,
        listPrice } = bookToEdit

    return (
        <section className="book-edit-container">

            <h1>{bookId ? 'Book Edit' : 'Book Add'}</h1>

            <form className="grid" onSubmit={onSaveBook}>

                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} onChange={handleChange} name="title" />

                <label htmlFor="authors">Authors:</label>
                <input type="text" id="authors" value={authors} onChange={handleChange} name="authors" />

                <label htmlFor="description">Description:</label>
                <input type="text" id="description" value={description} onChange={handleChange} name="description" />

                <label htmlFor="pages">Number of pages:</label>
                <input type="number" id="pages" value={pageCount} onChange={handleChange} name="pages" />

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" value={listPrice.amount || ''} onChange={handleChange} name="price" />

                <label htmlFor="isOnSale">On Sale:</label>
                <input type="checkbox" id="isOnSale" onChange={handleChange} name="isOnSale" />
                <button>Save</button>
            </form>
        </section>

    )
}