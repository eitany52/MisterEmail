import { useNavigate } from "react-router";
import { EmailFolderList } from "./EmailFolderList.jsx";

export function EmailSideBar({ folder }) {
    const navigate = useNavigate()

    function onGoToCompose() {
        navigate(`/email/${folder}?compose=new`)
    }

    return (
        <div className="email-side-bar">
            <section onClick={onGoToCompose} className="compose-icon-container">
                <span className="compose-icon material-symbols-outlined">edit</span>
                <span className="compose-text">Compose</span>
            </section>
            <EmailFolderList folder={folder} />
        </div>
    )
}