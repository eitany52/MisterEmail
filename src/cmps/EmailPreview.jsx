import { Link } from "react-router-dom"
export function EmailPreview({ email }) {
    return (
        <article className="email-preview">
            <Link to={`/email/${email.id}`}>
                <h1 style={{
                    fontWeight: email.isRead ? "normal" : "bold",
                    backgroundColor: email.isRead ? "#f2f6fc" : "white"
                }}>
                    {email.subject} - {email.body}
                </h1>
            </Link>
        </article>
    )
}