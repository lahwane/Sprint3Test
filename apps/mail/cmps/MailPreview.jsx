const { useState } = React
const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, onSelectMail }) {

    console.log(mail)
    const [isStarred, setIsStarred] = useState(mail.isStarred || false)
    const dateFormatted = utilService.getFormattedDate(mail.createdAt)

    function onToggleStarred(ev) {
        setIsStarred(!isStarred)
        mail.isStarred = !mail.isStarred
    }

    return (
        <tr className="mail-preview" onClick={() => onSelectMail(mail.id)}>
            <td className="stars-col flex justify-center" onClick={onToggleStarred}>
                <span className={`star-icon ${isStarred ? 'starred' : ''}`} >
                    {isStarred ? '★' : '☆'}
                </span>
            </td>
            <td className="from-col">
                {mail.from}
            </td>
            <td className="subject-col flex">
                <span className="mail-subject">{mail.subject}...</span>
                <span>
                    {mailService.getShortBody(mail.body)}
                </span>
            </td>
            <td className="date-col">
                {dateFormatted}
            </td>
        </tr>
    )

}

