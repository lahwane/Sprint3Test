const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"
import { AboutUs } from "./pages/About.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

export function App() {

    const [page, setPage] = useState('home')
    function onSetPage(page) {
        setPage(page)
    }

    return (
        <Router>
            <section className="app">
                <AppHeader onSetPage={onSetPage} />
                <UserMsg />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/books" element={<BookIndex />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/books/:bookId" element={<BookDetails />} />
                        <Route path="/books/edit" element={<BookEdit />} />
                        <Route path="/books/edit/:bookId" element={<BookEdit />} />
                    </Routes >
                </main>
            </section>
        </Router>

    )
}