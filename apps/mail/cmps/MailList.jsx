import { MailPreview } from "./MailPreview.jsx"

export function MailList({mails}) {

    if (!mails) return <div className="mail-list">No mails to show</div>


    return (
        <section className="mail-list">
            {mails.map(mail=>(
                <MailPreview mail={mail} key={mail.id}/>

            ))}

        </section>
    )
}
