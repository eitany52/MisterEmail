import { EmailList } from '../cmps/EmailList.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { emailService } from '../services/email.service.js'
import { useEffect, useRef, useState } from "react"
import { Outlet, useParams } from 'react-router-dom'

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const isEmailSelectedRef = useRef(false)
    const params = useParams()


    useEffect(() => {
        loadEmails()
        isEmailSelectedRef.current = false
    }, [filterBy, params])

    async function loadEmails() {
        try {
            const emails = await emailService.getEmails(filterBy)
            setEmails(emails)
        } catch (error) {
            console.log("Having issues with loading emails", error)
        }
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.removeEmail(emailId)
            setEmails(emails => emails.filter(email => email.id !== emailId))
        } catch (error) {
            console.log("Having issues with removing this email", error)
        }
    }

    async function onMarkOrUnmark(emailId, emailField) {
        const email = emails.find(email => email.id === emailId)
        email[emailField] = !email[emailField]
        try {
            await emailService.updateEmail(email)
            const emailIdx = emails.findIndex(email => email.id === emailId)
            setEmails(emails => {
                emails.splice(emailIdx, 1, email)
                return [...emails]
            })
        } catch (error) {
            console.log("Having issues with updating this email", error)
        }
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    if (params.emailId && !isEmailSelectedRef.current) {
        isEmailSelectedRef.current = true
        setEmails(null)
    }

    return (
        <section className="email-index">
            <EmailFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />
            {!params.emailId && emails && <EmailList emails={emails}
                onRemoveEmail={onRemoveEmail}
                onMarkOrUnmark={onMarkOrUnmark} />}
            {params.emailId && < Outlet />}
        </section>
    )
}