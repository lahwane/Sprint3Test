import { utilService } from "../services/util.service.js"

const { useState } = React

export function AddReview({ onAddReview, toggleReview }) {

    const [reviewToAdd, setReviewToAdd] = useState(getEmptyReview())

    function getEmptyReview() {

        return {
            id: '',
            fullName: '',
            rating: '',
            date: new Date().toISOString().slice(0, 10),
            txt: '',
        }
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        if (field === 'rating') value = +value
        setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        const newReview = { ...reviewToAdd, id: utilService.makeId() }
        onAddReview(newReview)
        setReviewToAdd(getEmptyReview())
        toggleReview()


    }

    return (
        <section className="add-review">
            <h3>Add a review</h3>
            <button className='btn-toggle-modal'
                onClick={toggleReview}>X
            </button>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="fullname">Full Name</label>
                <input
                    id='fullname'
                    type="text"
                    name="fullName"
                    value={reviewToAdd.fullName}
                    onChange={handleChange} />

                <label htmlFor="rating">Rating (1-5):</label>
                <input
                    id='rating'
                    type="number"
                    name="rating"
                    value={reviewToAdd.rating}
                    onChange={handleChange} />

                <label htmlFor="rating">Date:</label>
                <input
                    id='date'
                    type="date"
                    name="date"
                    value={reviewToAdd.date}
                    onChange={handleChange} />

                <label htmlFor="txt">Review:</label>
                <input
                    id='txt'
                    type="text"
                    name="txt"
                    value={reviewToAdd.txt}
                    onChange={handleChange} />

                <button>Save</button>
            </form>
        </section>
    )
}
