import { bookService } from "../services/book.services.js"
import { AddReview } from "./AddReview.jsx"
const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)

    const params = useParams()

    useEffect(() => {
        if (!params.bookId) return
        else {
            bookService.getById(params.bookId)
                .then((book) => setBook(book))
        }
    }, [params.bookId])

    if (!book) return <div>Loading...</div>
    const { title,
        subtitle,
        authors,
        description,
        pageCount,
        thumbnail,
        language,
        categories,
        listPrice } = book

    function getBookLng(lng) {
        switch (lng) {
            case 'he':
                return 'Hebrew'
            case 'sp':
                return 'Spanish'
            default:
                return 'English'
        }
    }

    function onAddReview(newReview) {
        bookService.saveReview(params.bookId, newReview)
            .then(book => {
                setBook(book)
            })
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(params.bookId, reviewId)
            .then(book => {
                setBook(book)
            })
    }

    function onToggleReviewModal() {
        setIsShowReviewModal(prevIsReviewModal => !prevIsReviewModal)
    }

    function getStarsRating(rating) {
        const fullStar = '★'
        const emptyStar = '☆'
        const maxStars = 5
        let starRating = fullStar.repeat(rating)
        starRating += emptyStar.repeat(maxStars - rating)
        return starRating
    }

    return (
        <section className="book-details-container place-center">
            <h2 className="book-title"> {title}</h2>
            <h4 className="book-subtitle">{subtitle}</h4>
            <section className="book-details flex">
                <img src={thumbnail} alt={title} />
                <div className="book-details-info">
                    <nav className='book-details-nav flex'>
                        <Link to={`/books/${book.prevBookId}`}>
                            <button><i className="fa-solid fa-arrow-left"></i></button>
                        </Link>
                        <Link to={`/books/${book.nextBookId}`}>
                            <button><i className="fa-solid fa-arrow-right"></i></button>
                        </Link>
                    </nav>
                    <p>
                        <span>price: </span>
                        {listPrice.amount} {listPrice.currencyCode}
                    </p>
                    <p>
                        <span>Language: </span>
                        {getBookLng(language)}
                    </p>
                    <p>
                        <span>description: </span>
                        {description}
                    </p>
                    <p>
                        <span>Category: </span>
                        {categories}
                    </p>
                    <p>
                        <span>Authors: </span>
                        {authors}
                    </p>
                    <p>
                        <span>Number of pages: </span>
                        {pageCount}
                    </p>
                    <button><Link to="/books">Back to List</Link></button>
                    <button><Link to={`/books/edit/${params.bookId}`}>Edit Book</Link></button>
                </div>
            </section>
            <section className="book-reviews">
                <h3>Reviews</h3>
                {book.reviews && book.reviews.length
                    ? (
                        <section className="book-reviews-container">
                            {book.reviews.map(review => (
                                <div className="book-review" key={review.id}>
                                    <p><span>Name:</span> {review.fullName}</p>
                                    <p><span>Rating:</span> {getStarsRating(review.rating)}</p>
                                    <p><span>Read at:</span> {review.date}</p>
                                    <p><span>Review:</span> {review.txt}</p>
                                    <button onClick={() => onRemoveReview(review.id)}>x</button>
                                </div>
                            ))}
                        </section>
                    )
                    : (<p>No reviews yet</p>)
                }
                <button onClick={onToggleReviewModal}>Add+</button>

                {isShowReviewModal && (
                    <div className="review-modal-container">
                        <div className="modal-content">
                            <AddReview
                                onAddReview={onAddReview}
                                toggleReview={onToggleReviewModal}
                            />
                        </div>
                    </div>

                )}
            </section>
        </section>
    )
}
