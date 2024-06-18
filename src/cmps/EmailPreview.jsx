import { useNavigate } from "react-router-dom"
export function EmailPreview({ email, onRemoveEmail, onToggleMark, onToggleTrash, folder, searchParams }) {

    const navigate = useNavigate()

    function onGoToEmailDetails() {
        if (email.sentAt) {
            const queryParams = `?${searchParams + ''}`
            navigate(`/email/${folder}/${email.id}${queryParams}`)
        }
        else {
            navigate(`/email/${folder}?compose=${email.id}`)
        }
    }

    function onToggleIsStarred(ev) {
        ev.stopPropagation()
        onToggleMark(email.id, "isStarred")
    }

    function onToggleIsRead(ev) {
        ev.stopPropagation()
        onToggleMark(email.id, "isRead")
    }

    function onToggleRemovedAt(ev) {
        ev.stopPropagation()
        if (!email.removedAt) {
            const updatedEmail = {
                ...email,
                removedAt: Date.now()
            }
            onToggleTrash(updatedEmail)
        }
        else {
            onRemoveEmail(email.id)
        }
    }

    function onRestoreEmail(ev) {
        ev.stopPropagation()
        const updatedEmail = {
            ...email,
            removedAt: null
        }
        onToggleTrash(updatedEmail)
    }

    const isStarred = email.isStarred ? "Starred" : " Not Starred"
    const isStarredClass = email.isStarred ? "starred" : ""
    const isReadClass = email.isRead ? "read" : ""
    return (
        <li onClick={onGoToEmailDetails} className={`email-preview ${isReadClass}`}>
            <span
                title={isStarred}
                className={`star-icon ${isStarredClass} material-symbols-outlined`}
                onClick={onToggleIsStarred}>
                star
            </span>
            <div className={`main-email-container ${isReadClass}`}>
                <span className="email-from">{email.sentAt ? email.from : "Draft"}</span>
                <span className="email-subject">{email.subject}</span>
                {/* <span className="email-separator">-</span> */}
                <span className="email-body">&ensp;-&ensp;{email.body}</span>
            </div>
            {email.removedAt &&
                <span title="Restore" onClick={onRestoreEmail} className=" restore-icon material-symbols-outlined">
                    restore_from_trash
                </span>
            }
            <span
                title="Delete"
                className="delete-icon material-symbols-outlined"
                onClick={onToggleRemovedAt}>
                delete
            </span>
            <span
                title={`Mark as ${email.isRead ? "Unread" : "Read"}`}
                className={`is-read-icon ${email.isRead ? "mark-as-unread" : "mark-as-read"} material-symbols-outlined`}
                onClick={onToggleIsRead}>
                {email.isRead ? "mail" : "drafts"}
            </span>
        </li>
    )
}