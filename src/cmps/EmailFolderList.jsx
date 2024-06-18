import { emailService } from "../services/email.service"
import {useNavigate } from "react-router-dom"

export function EmailFolderList({ folder: currFolder }) {
    const navigate = useNavigate()
    const folders = emailService.getEmailFolderList()

    function onGoToFolder(path) {
        if(path === currFolder) return
        navigate(`/email/${path}`)
    }

    return (
        <ul className="email-folder-list">
            {folders.map(folder => {
                return (
                    <li
                        className={currFolder === folder.path ? "active" : ""}
                        key={folder.path}
                        onClick={() => onGoToFolder(folder.path)}>
                        <span className="folder-icon material-symbols-outlined">{folder.icon}</span>
                        <span className="folder-name">{folder.name}</span>
                    </li>
                )
            })}
        </ul>
    )
}