import { EmailPreview } from "./EmailPreview.jsx"
export function EmailList({ emails, onRemoveEmail, onMarkOrUnmark}) {


    return (
        <ul className="email-list">
            {emails.map(email => {
                return (
                    <li key={email.id}>
                        <EmailPreview email={email} />
                        <section className="email-actions">
                            <button onClick={() => onRemoveEmail(email.id)} className="remove-email-btn">
                                Remove
                            </button>
                            <button onClick={() => onMarkOrUnmark(email.id, "isRead")} className="read-unread-btn">
                                Mark as {email.isRead ? "Unread" : "Read"}
                            </button>
                            <button onClick={() => onMarkOrUnmark(email.id, "isStarred")} className="starred-unstarred-btn">
                                {email.isStarred ? "Starred" : " Not Starred"}
                            </button>
                        </section>
                    </li>
                )
            })}
        </ul>
    )
}