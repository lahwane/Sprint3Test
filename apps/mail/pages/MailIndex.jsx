
const { useEffect, useState } = React
// const [searchParams, setSearchParams] = useSearchParams()

import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from "../cmps/MailCompose.jsx"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadMails()
        console.log(filterBy)

    }, [filterBy])

    // filterBy.status='inbox'

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                console.log(mails)
                setMails(mails)
            })
            .catch(err => {
                console.error('Error in loading mails:', err)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onSelectMailFolder(folder) {
        setFilterBy(prevFilter => ({ ...prevFilter, status: folder }))
    }

    return (
        <section className="mail-index-container flex">
            <div className="mail-folders">

                <MailFolderList
                    onSelectMailFolder={onSelectMailFolder}
                />
            </div>

            <div className="mail-filter-list">

                <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <MailList mails={mails} />
                <MailCompose/>
            </div>
        </section>)
}



