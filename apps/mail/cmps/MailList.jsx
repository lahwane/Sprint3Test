import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {

    if (!mails) return <div className="mail-list">No mails to show</div>

    return (
        <section className="mail-list-container">
            <table className="mail-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {mails.map(mail => (
                        <MailPreview mail={mail} key={mail.id} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}
