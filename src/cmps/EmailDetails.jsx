import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { emailService } from "../services/email.service.js"

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        try {
            const email = await emailService.getEmail(params.emailId)
            setEmail(email)
        } catch (error) {
            console.log("Having issues with loading this email", error)
        }
    }

    async function onRemoveEmail() {
        try {
            await emailService.removeEmail(email.id)
            setEmail(null)
            navigate('/email')

        } catch (error) {
            console.log("Having issues with removing this email", error)
        }
    }

    async function onGoBack() {
        try {
            await emailService.updateEmail({ ...email, isRead: true })
            setEmail(email => ({ ...email, isRead: true }))
            navigate('/email')
        } catch (error) {
            console.log("Having issues with updating this email", error)
        }
    }

    if (!email) return

    return (
        <section className="email-details">
            <h1>{email.subject}</h1>
            <p>{email.body}</p>
            <button onClick={onRemoveEmail} className="remove-email">Remove</button>
            <button onClick={onGoBack}>Back</button>
        </section>
    )
}