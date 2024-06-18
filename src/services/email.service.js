import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const emailService = {
    getEmails,
    removeEmail,
    getEmail,
    getDefaultFilter,
    getEmailFolderList,
    getFilterFromSearchParams,
    convertFilterIsRead,
    createEmptyEmail,
    save
}

const STORAGE_KEY = "emailsDB"
const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}

_createEmails()

async function getEmails(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        emails = filterEmails(emails, filterBy)
    }
    return emails
}

function filterEmails(emails, filterBy) {
    const { status, txt, isRead } = filterBy
    emails = filterEmailsByStatus(emails, status)

    if (txt) {
        const regExp = new RegExp(txt, 'i')
        emails = emails.filter(email =>
            regExp.test(email.subject) || regExp.test(email.body)
        )
    }
    if (isRead !== null) {
        emails = emails.filter(email => email.isRead === isRead)
    }
    return emails
}

function filterEmailsByStatus(emails, status) {
    switch (status) {
        case "inbox":
            emails = emails.filter(email =>
                email.to === loggedInUser.email && !email.removedAt)
            break
        case "sent":
            emails = emails.filter(email =>
                email.from === loggedInUser.email && email.sentAt && !email.removedAt)
            break
        case "starred":
            emails = emails.filter(email => email.isStarred && !email.removedAt)
            break
        case "trash":
            emails = emails.filter(email => email.removedAt)
            break
        case "draft":
            emails = emails.filter(email => !email.sentAt && !email.removedAt)
            break
    }
    return emails
}

function removeEmail(emailId) {
    return storageService.remove(STORAGE_KEY, emailId)
}

function getEmail(emailId) {
    return storageService.get(STORAGE_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(STORAGE_KEY, email)
    }
    else {
        email.from = loggedInUser.email
        return storageService.post(STORAGE_KEY, email)
    }
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null
    }
}

function getFilterFromSearchParams(searchParams, folder) {
    const filterBy = {
        status: folder,
        txt: searchParams.get('txt') || '',
        isRead: JSON.parse(searchParams.get('isRead'))
    }

    return filterBy
}

function convertFilterIsRead(isRead) {
    switch (isRead) {
        case null:
            isRead = "All"
            break;
        case true:
            isRead = "Read"
            break;
        case false:
            isRead = "Unread"
            break;
    }
    return isRead
}
function getEmailFolderList() {
    return [
        {
            path: 'inbox',
            icon: 'inbox',
            name: 'Inbox'
        },
        {
            path: 'starred',
            icon: 'star',
            name: 'Starred'
        },
        {
            path: 'sent',
            icon: 'send',
            name: 'Sent'
        },
        {
            path: 'draft',
            icon: 'draft',
            name: 'Drafts'
        },
        {
            path: 'trash',
            icon: 'Delete',
            name: 'Trash'
        },
    ]
}

function _createEmail(
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    from,
    to,
    removedAt = null) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        from,
        to,
        removedAt
    }
}

function createEmptyEmail(
    subject = '',
    body = '',
    isRead = null,
    isStarred = false,
    sentAt = null,
    from = '',
    to = '',
    removedAt = null) {
    return {
        id: '',
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        from,
        to,
        removedAt
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(
            _createEmail(
                'Urgent!',
                `Dear Sir:

I have been requested by the Nigerian National Petroleum Company to contact you for assistance in resolving a matter. The Nigerian National Petroleum Company has recently concluded a large number of contracts for oil exploration in the sub-Sahara region. The contracts have immediately produced moneys equaling US$40,000,000. The Nigerian National Petroleum Company is desirous of oil exploration in other parts of the world, however, because of certain regulations of the Nigerian Government, it is unable to move these funds to another region.
				
You assistance is requested as a non-Nigerian citizen to assist the Nigerian National Petroleum Company, and also the Central Bank of Nigeria, in moving these funds out of Nigeria. If the funds can be transferred to your name, in your United States account, then you can forward the funds as directed by the Nigerian National Petroleum Company. In exchange for your accommodating services, the Nigerian National Petroleum Company would agree to allow you to retain 10%, or US$4 million of this amount.
				
However, to be a legitimate transferee of these moneys according to Nigerian law, you must presently be a depositor of at least US$100,000 in a Nigerian bank which is regulated by the Central Bank of Nigeria.
				
If it will be possible for you to assist us, we would be most grateful. We suggest that you meet with us in person in Lagos, and that during your visit I introduce you to the representatives of the Nigerian National Petroleum Company, as well as with certain officials of the Central Bank of Nigeria.
				
Please call me at your earliest convenience at 18-467-4975. Time is of the essence in this matter; very quickly the Nigerian Government will realize that the Central Bank is maintaining this amount on deposit, and attempt to levy certain depository taxes on it.
				
Yours truly,
				
				Prince Alyusi Islassis`,
                false,
                false,
                Date.now() - 99999,
                'Alusi@Kingdom.com',
                'user@appsus.com'
            )
        )
        emails.push(
            _createEmail(
                'octopus!!!',
                `⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠟⠛⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿
				 ⣿⣿⣿⣿⣿⠟⣉⣤⣶⣾⣿⣿⣿⣿⣷⣶⣤⣉⠻⣿⣿⣿⣿⣿⣿
				 ⣿⣿⣿⡟⣡⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡌⢻⣿⣿⣿⣿
				 ⣿⣿⡟⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⢿⣿⣿⣿
				 ⣿⣿⡇⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢸⣿⣿⣿
				 ⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿
				 ⣿⣿⣇⢹⣿⡿⠋⠉⠻⣿⣿⣿⣿⣿⣿⡿⠟⠿⣿⣿⡇⣸⣿⣿⣿
				 ⣿⣿⣿⡈⢿⣇⠀⠀⢀⣿⣿⡿⢿⣿⣿⣾⣿⣿⣾⡿⢁⣿⣿⣿⣿
				 ⣿⠟⢿⣷⡘⣿⣿⣿⣿⣿⣧⣴⣤⣴⣿⣿⣿⣿⣿⢃⣾⡿⠻⣿⣿
				 ⡏⡄⠸⠟⠃⠈⠛⠛⠿⣿⣿⣿⠿⠛⠛⠻⣿⡿⠁⠘⠿⠇⢀⢹⣿
				 ⡅⣿⣄⠀⣰⣾⣿⣷⡄⠘⠟⣡⣶⣿⣿⣦⠈⠁⠰⠿⠃⣠⣿⢸⣿
				 ⣷⡹⢿⡀⢿⣿⣿⣿⣿⠀⣴⣿⣿⡟⢁⡀⠀⢰⣤⣶⣾⣿⢃⣾⣿
				 ⣿⣿⣦⣀⠸⣿⣿⡟⠃⠸⣿⣿⣿⡇⠘⣛⠂⠾⠿⢟⣋⣵⣿⣿⣿
				 ⣿⣿⣿⣿⣧⡘⠿⣿⠰⣶⣍⣛⣛⣃⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
				 ⣿⣿⣿⣿⣿⣿⣶⣤⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`,
                true,
                true,
                Date.now() - 21391293,
                'momo@momo.com',
                'user@appsus.com'
            )
        )
        emails.push(
            _createEmail(
                'Buy our stuff!',
                `Hey Mahatma,
				
I haven't heard back from you and that tells me one of three things:

1) You've already chosen a different company for this, and if that's the case please let me know so I can stop bothering you.
2) Yo're still interested but haven't had the time to get back to me yet.
3) You've fallen and can't get up - in that case let me know and I'll call 911.

Please let me know which one is it because I'm starting to worry... Thanks in advance
and looking forward to hearing from you.`,
                false,
                false,
                1551133930594,
                'momo@momo.com',
                'user@appsus.com'
            )
        )
        emails.push(
            _createEmail(
                'Regarding your job application',
                `Dear Mahatma,
				
Thank you for your interest in our Full Stack Manager position in our London office. 
We regret to inform you that we have filled this position.
We appreciate your interst in opportunities with us, and will retain your information for consideration for future openings.
we wish you the best of success in your employment search`,
                true,
                false,
                1551133930594,
                'momo@momo.com',
                'user@appsus.com'
            )
        )
        emails.push(
            _createEmail(
                'Money transfer',
                `Dear Alyusi,
I understand the urgency of the matter. I have the funds ready, and will meet you in Lagos at once.
Looking forward to meeting the representatives of the National Petroleum Company.

Many thanks, 
Mahatma`,
                true,
                false,
                1683893674944,
                'user@appsus.com',
                'Alusi@Kingdom.com'
            )
        )
        emails.push(
            _createEmail(
                'Job Application for Marketing Manager Position',
                `Dear Company,

I hope this email finds you well. My name is Mahatma, and I am writing to express my strong interest in the Marketing Manager position at Company, as advertised on [Job Board/Company Website].
		
With a solid background in marketing strategy and a proven track record of driving successful campaigns, I am confident in my ability to contribute to the growth and success of Company. I have 5 years of experience in marketing roles, including my most recent position as Marketing Specialist at my previous company. During my time there, I led cross-functional teams, developed and implemented comprehensive marketing plans, and successfully increased brand awareness and customer engagement.
		
In addition to my experience, I hold a Bachelor's degree in Marketing from University of my state and have a deep understanding of digital marketing techniques, social media management, and market research. I am also proficient in various marketing tools, including Google Analytics, SEO optimization, and CRM software.
		
I am particularly drawn to Company due to its innovative approach to marketing and its commitment to delivering exceptional results. I am excited about the opportunity to leverage my skills and contribute to your marketing initiatives.
		
Please find attached my resume for your review. I would greatly appreciate the opportunity to discuss how my qualifications align with the requirements of the Marketing Manager position. I am available for an interview at your convenience.
		
Thank you for considering my application. I look forward to the possibility of joining the talented team at Company.
		
Best regards,
		
Mahatma
123-456-7890`,
                false,
                true,
                Date.now() - 1232131,
                'user@appsus.com',
                'company@email.com'
            )
        )
        for (let i = 0; i < 30; i++) {
            emails.push(
                _createEmail(
                    utilService.makeLorem(utilService.getRandomIntInclusive(3, 6)),
                    utilService.makeLorem(utilService.getRandomIntInclusive(25, 150)),
                    utilService.getRandomIntInclusive(0, 1) ? true : false,
                    utilService.getRandomIntInclusive(0, 1) ? true : false,
                    utilService.getRandomIntInclusive(100000, Date.now()),
                    `${utilService.makeLorem(1)}@appsus.com`,
                    'user@appsus.com',
                    utilService.getRandomIntInclusive(0, 5)
                        ? null
                        : utilService.getRandomIntInclusive(100000, Date.now())
                )
            )
        }

        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function createEmails() {
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
                from: 'DorDORdorDordorDordor@gmail.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey hey',
                body: 'Do you want to do something later?',
                isRead: false,
                isStarred: false,
                sentAt: 3551133930594,
                removedAt: null,
                from: 'eitan@gmail.com',
                to: 'user@appsus.com'
            }, {
                id: utilService.makeId(),
                subject: 'Hi Yoni',
                body:
                    `Just wanted to let you know that I went on vacation.
                I went to Germany, I will stay in Germany for at least
                3 weeks. Actually I am not sure when i come back. So
                I will let you know and be ready to pick me up when i return.
                Thank you, Eitan.`,
                isRead: false,
                isStarred: false,
                sentAt: 4551133930594,
                removedAt: null,
                from: 'Dani@gmail.com',
                to: 'user@appsus.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}