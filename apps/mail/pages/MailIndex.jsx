
const { useEffect, useState } = React
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                console.log(mails);

                setMails(mails)
            })
            .catch(err => {
                console.error('Error in loading mails:', err)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    return (
        <section className="mail-index-container">
            <MailFilter filterBy={{ filterBy }} onSetFilterBy={onSetFilterBy} />
            <MailList mails={mails} />
        </section>)
}



