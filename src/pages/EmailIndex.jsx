import { EmailList } from '../cmps/EmailList.jsx'
import { EmailFilter } from '../cmps/EmailFilter.jsx'
import { emailService } from '../services/email.service.js'
import { useEffect, useRef, useState } from "react"
import { Outlet, useParams, useSearchParams } from 'react-router-dom'
import { EmailSideBar } from "../cmps/EmailSideBar.jsx"
import { EmailCompose } from "../cmps/EmailCompose.jsx"

export function EmailIndex() {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromSearchParams(searchParams, params.folder))
    const isEmailSelectedRef = useRef(false)

    useEffect(() => {
        renderSearchParams()
        loadEmails()
    }, [filterBy, params.folder])

    useEffect(() => {
        isEmailSelectedRef.current = false
        loadEmails()
    }, [params])

    async function loadEmails() {
        try {
            const emails = await emailService.getEmails({ ...filterBy, status: params.folder })
            setEmails(emails)
        } catch (error) {
            console.log("Having issues with loading emails", error)
        }
    }

    function onLoadEmails() {
        loadEmails()
    }

    function renderSearchParams() {
        const filterForParams = {}
        for (const key in filterBy) {
            if (key !== 'status' && filterBy[key] !== null && filterBy[key] !== '') {
                filterForParams[key] = (filterBy[key] + '')
            }
        }
        setSearchParams(filterForParams)
    }

    async function onToggleTrash(updatedEmail) {
        try {
            await emailService.save(updatedEmail)
            setEmails(emails =>
                emails.filter(email => email.id !== updatedEmail.id))
        } catch (error) {
            console.log("having issues with saving this email", error);
        }
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.removeEmail(emailId)
            setEmails(emails =>
                emails.filter(email => email.id !== emailId))
        } catch (error) {
            console.log("Having issues with removing this email", error)
        }
    }

    async function onToggleMark(emailId, emailField) {
        const email = emails.find(email => email.id === emailId)
        email[emailField] = !email[emailField]
        try {
            await emailService.save(email)
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

    const { txt, isRead } = filterBy
    const isComposeOpen = !!searchParams.get('compose')
    return (
        <section className="email-index">
            {console.log("rendered")}
            <header>
                <EmailFilter defaultFilter={{ txt, isRead }} onSetFilterBy={onSetFilterBy} />
            </header>
            <aside>
                {isComposeOpen && <EmailCompose onLoadEmails={onLoadEmails} />}
                <EmailSideBar folder={params.folder} />
            </aside>
            <main>
                {!params.emailId && emails && <EmailList
                    emails={emails}
                    onRemoveEmail={onRemoveEmail}
                    onToggleMark={onToggleMark}
                    folder={params.folder}
                    searchParams={searchParams}
                    onToggleTrash={onToggleTrash} />}
                {params.emailId && < Outlet context={searchParams} />}
            </main>
        </section>
    )
}