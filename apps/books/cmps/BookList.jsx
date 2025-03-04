import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM


export function BookList({ books, onRemoveBook }) {

    if (!books.length) return <div>No books to show</div>

    return (
        <section className="book-list-container ">
            <div className="add-book">
                <button>
                    <Link to="/books/edit">Add Book</Link>
                </button>
            </div>
            <section className="book-list flex justify-center">
                {books.map(book =>
                    <Link to={`/books/${book.id}`}>Select
                        <div key={book.id} className="book-preview-container">
                            <BookPreview book={book}
                                onRemoveBook={onRemoveBook}
                            />
                        </div>
                    </Link>
                )}
            </section>
        </section>
    )
}