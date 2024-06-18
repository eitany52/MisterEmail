import { useEffect, useRef, useState } from "react"
import { emailService } from "../services/email.service.js"
import { useSearchParams } from "react-router-dom"
import { utilService } from "../services/util.service.js"

export function EmailCompose({ onLoadEmails }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [emailToEdit, setEmailToEdit] = useState(emailService.createEmptyEmail())
    const [viewState, setViewState] = useState("normal")
    const isEmailChangedRef = useRef(false)
    const timeoutRef = useRef()

    useEffect(() => {
        const emailId = searchParams.get('compose')
        if (emailId && emailId !== 'new') {
            loadEmailToEdit(emailId)
        }
    }, [])

    async function loadEmailToEdit(emailId) {
        try {
            const email = await emailService.getEmail(emailId)
            setEmailToEdit(email)
        } catch (error) {
            console.log("Having issues with loading this email")
        }
    }

    useEffect(() => {
        if (!isEmailChangedRef.current) return
        resetTimeout()
        timeoutRef.current = setTimeout(() => {
            saveDraft(emailToEdit)
        }, 5000)

    }, [emailToEdit])

    function resetTimeout() {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
    }

    async function saveDraft(email) {
        try {
            const savedEmail = await emailService.save(email)
            isEmailChangedRef.current = false
            if (!email.id) {
                setEmailToEdit(savedEmail)
            }
            onLoadEmails()
        } catch (error) {
            console.log("Having issues with saving this email", error)
        }
    }

    function onChangeText({ target }) {
        isEmailChangedRef.current = true
        const { name: key, value } = target
        setEmailToEdit(emailToEdit => ({ ...emailToEdit, [key]: value }))
    }

    async function onSendEmail(ev) {
        ev.preventDefault()
        if (isEmailChangedRef.current) {
            resetTimeout()
        }
        await saveDraft({ ...emailToEdit, sentAt: Date.now() })
        deleteComposeFromUrl()
    }

    function deleteComposeFromUrl() {
        setSearchParams(searchParams => {
            searchParams.delete('compose')
            return searchParams
        })
    }

    function onChangeViewState(viewState, ev) {
        if (ev) ev.stopPropagation()
        setViewState(viewState)
    }

    async function onCloseCompose(ev) {
        ev.stopPropagation()
        if (isEmailChangedRef.current) {
            resetTimeout()
            await saveDraft(emailToEdit)
        }
        deleteComposeFromUrl()
    }

    const { to, subject, body } = emailToEdit

    return (
        <>
            {emailToEdit && <div className={`${viewState} email-compose`}>
                <header
                    onClick={() => {
                        onChangeViewState(viewState === 'minimize' ? 'normal' : 'minimize')
                    }}
                >
                    <h4>New Message</h4>
                    <div className='icon-container'>
                        {viewState !== 'minimize' && (
                            <span
                                onClick={(ev) => onChangeViewState('minimize', ev)}
                                className='material-symbols-outlined'
                            >
                                minimize
                            </span>
                        )}
                        {viewState === 'minimize' && (
                            <span
                                onClick={(ev) => onChangeViewState('normal', ev)}
                                className='material-symbols-outlined'
                            >
                                add
                            </span>
                        )}
                        {viewState !== 'full-screen' && (
                            <span
                                onClick={(ev) => onChangeViewState('full-screen', ev)}
                                className='material-symbols-outlined'
                            >
                                open_in_full
                            </span>
                        )}
                        {viewState === 'full-screen' && (
                            <span
                                onClick={(ev) => onChangeViewState('normal', ev)}
                                className='material-symbols-outlined'
                            >
                                close_fullscreen
                            </span>
                        )}
                        <span
                            onClick={onCloseCompose}
                            className='material-symbols-outlined'
                        >
                            close
                        </span>
                    </div>
                </header>
                <form onSubmit={onSendEmail} className="compose-form">
                    <input
                        value={to}
                        name="to"
                        placeholder="To"
                        type="text"
                        onChange={onChangeText} />
                    <input
                        value={subject}
                        name="subject"
                        placeholder="Subject"
                        type="text"
                        onChange={onChangeText} />
                    <textarea
                        value={body}
                        name="body"
                        type="text"
                        onChange={onChangeText}>
                    </textarea>
                    <button className="send-btn">Send</button>
                </form>
            </div>}
            {emailToEdit && viewState === 'full-screen' && (
                <div
                    className='close-modal-screen'
                    onClick={() => onChangeViewState('minimize')}
                ></div>
            )}
        </>
    )
}