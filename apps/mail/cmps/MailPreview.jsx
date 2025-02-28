const { useState } = React
const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail }) {

    console.log(mail)
    const [isStarred, setIsStarred] = useState(mail.isStarred || false)
    const dateFormatted = utilService.getFormattedDate(mail.sentAt)

    function onToggleStarred(ev) {
        setIsStarred(!isStarred)
        mail.isStarred = !mail.isStarred
    }

    return (
        <tr className="mail-preview">
            <td className="stars-col flex justify-center" onClick={onToggleStarred}>
                <span className={`star-icon ${isStarred ? 'starred' : ''}`} >
                    {isStarred ? '★' : '☆'}
                </span>
            </td>
            <td className="from-col">
                <Link to={`/mail/${mail.id}`}>
                    {mail.from}
                </Link>
            </td>
            <td className="subject-col flex">
                <Link to={`/mail/${mail.id}`}>
                    <span className="mail-subject">{mail.subject}...</span>
                    <span>
                        {mailService.getShortBody(mail.body)}
                    </span>
                </Link>
            </td>
            <td className="date-col">
                {dateFormatted}
            </td>
        </tr>
    )

}

