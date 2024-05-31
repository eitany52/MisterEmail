import { useEffect, useState } from "react"

export function EmailFilter({ defaultFilter, onSetFilterBy }) {
    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        onSetFilterBy(filterBy)
    }, [filterBy])

    function onChangeTxtFilter(ev) {
        ev.preventDefault()
        const value = ev.target.txt.value
        setFilterBy(filterBy => ({ ...filterBy, txt: value }))
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

    return (
        <div className="email-filter">
            <form onSubmit={onChangeTxtFilter} className="txt-container">
                <input name="txt" id="txt" type="text" />
                <button className="search-btn">Search</button>
            </form>
            <section className="is-read-container">
                <select onChange={onChangeIsReadFilter} name="isRead">
                    <option value="All">All</option>
                    <option value="Read">Read</option>
                    <option value="Unread">Unread</option>
                </select>
            </section>
        </div>
    )
}