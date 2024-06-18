import { EmailPreview } from "./EmailPreview.jsx"
export function EmailList({ emails, onRemoveEmail, onToggleMark, onToggleTrash, folder, searchParams }) {


    return (
        <ul className="email-list">
            {emails.map(email => {
                return (
                    <EmailPreview
                        key={email.id}
                        email={email}
                        onRemoveEmail={onRemoveEmail}
                        onToggleMark={onToggleMark}
                        onToggleTrash={onToggleTrash}
                        folder={folder}
                        searchParams={searchParams}/>
                )
            })}
        </ul>
    )
}