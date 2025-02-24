export function MailPreview({ mail }) {
    console.log(mail);
    
    return (
        <article className="mail-preview">
            <h2>{mail.subject}</h2>
            <p>{mail.body}</p>
        </article>
    )

}