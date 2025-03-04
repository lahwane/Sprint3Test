
const { useEffect, useState } = React
// const [searchParams, setSearchParams] = useSearchParams()

import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailDetails } from "./MailDetails.jsx"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isCompose, setIsCompose] = useState(false)
    const [selectedMailId, setSelectedMailId] = useState(null)

    const [isFoldersOpen, setIsFoldersOpen] = useState(false)

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
        setSelectedMailId(null)
    }
    function onMailSent() {
        loadMails()
    }

    function onMailDeleted() {
        loadMails()
    }

    function toggleCompose() {
        setIsCompose(prevModal => !prevModal)
    }

    function onSelectMail(mailId) {
        setSelectedMailId(mailId)
    }

    function toggleMenu() {
        setIsFoldersOpen(menuOpen => !menuOpen)
    }

    return (
        <section className="mail-index-container flex">

            <button
                className="hamburger-btn"
                onClick={toggleMenu}>
                <i className="fa-solid fa-bars"></i>
            </button>
            <div className="mail-folders-container">
                <button
                    className="compose-btn"
                    onClick={toggleCompose}>
                    <i class="fa-solid fa-pencil"></i> Compose
                </button>
                <div className={`mail-folders ${isFoldersOpen ? 'open' : ''}`}>

                    <MailFolderList
                        onSelectMailFolder={onSelectMailFolder}
                    />
                </div>
            </div>

            <div className="mail-filter-list">

                <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                {selectedMailId ? (
                    <MailDetails
                        mailId={selectedMailId}
                        onBack={() => setSelectedMailId(null)}
                        onMailDeleted={onMailDeleted}
                    />
                ) : (

                    <MailList
                        mails={mails}
                        onSelectMail={onSelectMail} />
                )}
                {
                    isCompose && (
                        <MailCompose
                            onClose={toggleCompose}
                            onMailSent={onMailSent} />
                    )
                }
            </div>
        </section>)
}



