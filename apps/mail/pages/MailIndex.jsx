
const { useEffect, useState } = React
import { mailService } from "../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(()=>{
        loadMails()
    },[filterBy])

    function loadMails(){
        mailService.query(filterBy)
        .then(mails=>{
            setMails(mails)
        })
        .catch(err=>{
            console.error('Error in loading mails:',err)
        })
    }

    function onSetFilterBy(filterBy){
        setFilterBy({...filterBy})
    }




    return (
    <section className="mail-index-container">
        {console.log(mails)}
        <pre>{JSON.stringify(mails, null, 2)}</pre>
    </section>)
}



