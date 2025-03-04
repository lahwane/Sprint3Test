import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { useState } = React

export function MailCompose({ onClose, onMailSent }) {

    const [mailToCompose, setMailToCompose] = useState(mailService.getEmptyMail())
    console.log('CCCCCCCCCCCCCCC', mailToCompose)

    function handleChange({ target }) {
        let { name, value } = target
        setMailToCompose(prevMail => ({ ...prevMail, [name]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.save(mailToCompose)
            .then(savedMail => {
                console.log("Mail Saved: ", savedMail)
                setMailToCompose(mailService.getEmptyMail())
                onMailSent()
                onClose()
            })
            .catch(err => {
                console.error("Error in saving mail: ", err)
            })
    }

    function onCancelMail(ev) {
        ev.preventDefault()
        const draftMail = { ...mailToCompose, sentAt: null }
        mailService.save(draftMail)
            .then(savedDraft => {
                console.log("Draft saved:", savedDraft)
                onMailSent()
                onClose()
            })
    }

    return (
        <section className="mail-compose-modal">
            <h4>New Message</h4>
            <form onSubmit={onSaveMail} >
                <label className="to-label" htmlFor="to">To </label>
                <input
                    className="to-input"
                    name="to"
                    type="text"
                    id="to"
                    value={mailToCompose.to}
                    onChange={handleChange}
                />
                <label className="subject-label" htmlFor="subject">Subject </label>
                <input
                    className="subject-input"
                    name="subject"
                    type="text"
                    id="subject"
                    value={mailToCompose.subject}
                    onChange={handleChange}
                />

                <textarea
                    className="body-input"
                    name="body"
                    // type="text"
                    value={mailToCompose.body}
                    onChange={handleChange}
                ></textarea>

                <div className="mail-compose-actions flex space-between">
                    <button className="send-btn">Send</button>
                    <button
                        className="compose-cancel"
                        onClick={onCancelMail}>
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </form>

        </section>
    )

}
