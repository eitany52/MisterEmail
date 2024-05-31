import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const emailService = {
    getEmails,
    removeEmail,
    updateEmail,
    getEmail,
    getDefaultFilter
}

const STORAGE_KEY = "emailsDB"

_createEmails()

async function getEmails(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        const { txt, isRead } = filterBy
        if (txt) {
            emails = emails.filter(email =>
                email.subject.toLowerCase().includes(txt.toLowerCase()) ||
                email.body.toLowerCase().includes(txt.toLowerCase())
            )
        }
        if (isRead !== null) {
            emails = emails.filter(email => email.isRead === isRead)
        }
    }
    return emails
}

function removeEmail(emailId) {
    return storageService.remove(STORAGE_KEY, emailId)
}

function updateEmail(email) {
    return storageService.put(STORAGE_KEY, email)
}

function getEmail(emailId) {
    return storageService.get(STORAGE_KEY, emailId)
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null
    }
}

function createEmail(
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAtFrom,
    to) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAtFrom,
        to
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Hello',
                body: 'What are you doing right now?',
                isRead: false,
                isStarred: false,
                sentAt: 2551133930594,
                removedAt: null,
                from: 'Dor@gmail.com',
                to: 'user@app.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Hey',
                body: 'Do you want to do something later?',
                isRead: false,
                isStarred: false,
                sentAt: 3551133930594,
                removedAt: null,
                from: 'eitan@gmail.com',
                to: 'user@sus.com'
            }, {
                id: utilService.makeId(),
                subject: 'Hi Yoni',
                body: 'Just wanted to let you know that I went on vacation',
                isRead: false,
                isStarred: false,
                sentAt: 4551133930594,
                removedAt: null,
                from: 'Dani@gmail.com',
                to: 'yoni@gmail.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}