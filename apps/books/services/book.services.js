import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { booksData } from './books.js'
const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    getById,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    saveReview,
    removeReview
}
function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.amount) {
                books = books.filter(book => book.listPrice.amount >= filterBy.amount)
            }
            return books
        })
}
function getById(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

const imgUrls = [
    './assets/img/1.jpg',
    './assets/img/2.jpg',
    './assets/img/3.jpg',
    './assets/img/4.jpg',
    './assets/img/5.jpg',
    './assets/img/6.jpg',
    './assets/img/7.jpg',
    './assets/img/8.jpg',
    './assets/img/9.jpg'
]
function pickRandomImg() {
    const idx = utilService.getRandomInt(0, imgUrls.length)
    const randomImg = imgUrls[idx]
    return randomImg
}

function getEmptyBook(title = '', amount = 0) {
    return {
        id: '',
        title,
        listPrice: {
            amount,
            currencyCode: 'EUR',
            isOnSale: false
        },
        thumbnail: pickRandomImg()
    }
}

function getDefaultFilter() {
    return { title: '', amount: '' }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksData
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, amount = 150) {
    const book = getEmptyBook(title, amount)
    book.id = utilService.makeId()
    return book
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY)
        .then((books) => {
            const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
            const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
            const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
            book.nextBookId = nextBook.id
            book.prevBookId = prevBook.id
            return book
        })
}

function saveReview(bookId, review) {
    return getById(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.unshift(review)
            return save(book)
        })
}

function removeReview(bookId, reviewId) {
    return getById(bookId)
        .then(book => {
            const idx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(idx, 1)
            return save(book)
        })
}