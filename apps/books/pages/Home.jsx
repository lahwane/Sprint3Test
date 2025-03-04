const { Link, NavLink } = ReactRouterDOM

export function Home({ onSetPage }) {
    return (
        <section className="home-greeting">
            <h2>Welcome to MissBook Shop!!!</h2>
            <button className="btn-explore-books">
                <Link to="/books">Explore our Library</Link>
            </button>
        </section>
    )
}
