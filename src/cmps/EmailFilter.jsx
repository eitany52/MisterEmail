import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"

export function EmailFilter({ defaultFilter, onSetFilterBy }) {
    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        onSetFilterBy(filterBy)
    }, [filterBy.isRead])

    function onChangeTxtFilter({ target }) {
        const { value } = target
        setFilterBy(filterBy => ({ ...filterBy, txt: value }))
    }

    function onSubmitTxtFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterBy)
    }

    function onChangeIsReadFilter({ target }) {
        let { value } = target
        switch (value) {
            case "All":
                value = null
                break;
            case "Read":
                value = true
                break;
            case "Unread":
                value = false
                break;
        }
        setFilterBy(filterBy => ({ ...filterBy, isRead: value }))
    }
    const { txt, isRead } = filterBy
    return (
        <div className="email-filter">
            <form onSubmit={onSubmitTxtFilter} className="filter-container">
                <button
                    title="Search"
                    className="material-symbols-outlined">
                    search
                </button>
                <input
                    value={txt}
                    onChange={onChangeTxtFilter}
                    name="txt"
                    type="search"
                    placeholder="Search" />
                <section className="is-read-container">
                    <select
                        value={emailService.convertFilterIsRead(isRead)}
                        onChange={onChangeIsReadFilter}
                        name="isRead">
                        <option value="All">All</option>
                        <option value="Read">Read</option>
                        <option value="Unread">Unread</option>
                    </select>
                </section>
            </form>
        </div>
    )
}

{/* <form onSubmit={onChangeTxtFilter} className="txt-container">
                <span title="Search"
                    className="material-symbols-outlined">
                    search
                </span>
                <input name="txt" id="txt" type="search" />
            </form>
            <section className="is-read-container">
                <select onChange={onChangeIsReadFilter} name="isRead">
                    <option value="All">All</option>
                    <option value="Read">Read</option>
                    <option value="Unread">Unread</option>
                </select>
            </section>
        </div> */}

