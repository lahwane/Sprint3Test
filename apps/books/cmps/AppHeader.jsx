const { Link, NavLink } = ReactRouterDOM
export function AppHeader({ onSetPage }) {
    return (
        
        <header className="app-header flex align-center justify-between main-layout">
            {/* <section className=""> */}
            <h1 className="header-logo">Miss Book</h1>
            <nav className="app-nav flex">
             <NavLink to="/">Home</NavLink>
             <NavLink to="/about">About</NavLink>
             <NavLink to="/books">Books</NavLink>

            </nav>
            {/* </section> */}

        </header>
    )
}