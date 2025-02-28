// mail service

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createDemoMails()

export const mailService = {
    query,
    getDefaultFilter,
    getById,
    remove,
    save,
    getEmptyMail,
    getShortBody
}

function query(filterBy) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            mails = filter(mails, filterBy)
            mails.sort((a, b) => b.createdAt - a.createdAt)
            return mails
        })
}

function getById(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)

}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: undefined,
        isStarred: undefined,
        labels: []
    }
}

function getShortBody(Text, length = 12) {
    const words = Text.split(' ')
    const shortBody = words.slice(0, length).join(' ')
    return shortBody
}



function filter(mails, filterBy) {
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
    }
    if (filterBy.isRead !== undefined) {
        mails = mails.filter(mail => mail.isRead === filterBy.isRead)
    }

    switch (filterBy.status) {
        case 'inbox':
            mails = mails.filter(mail => mail.to === loggedinUser.email && !mail.removedAt && mail.sentAt)
            break
        case 'sent':
            mails = mails.filter(mail => mail.from === loggedinUser.email && mail.sentAt)
            break
        case 'drafts':
            mails = mails.filter(mail => !mail.sentAt)
            break
        case 'trash':
            mails = mails.filter(mail => mail.removedAt)
            break
    }
    console.log('after filter', filterBy, mails)

    return mails
}

function getEmptyMail() {
    return {
        id: '',
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'user@appsus.com',
        to: ''
    }
}

function _createDemoMails() {

    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                createdAt: 1740268800000,
                subject: 'Next meeting',
                body: 'just tried to contact you around the' + utilService.makeLorem(30),
                isRead: false,
                isStarred: false,
                sentAt: 1740268860000,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'delivery@example.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1740020949176,
                subject: 'Please call me',
                body: 'Tried to call you and you didnt' + utilService.makeLorem(30),
                isRead: false,
                isStarred: false,
                sentAt: 1740030949176,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'someone@momo.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1740010949176,
                subject: 'Final sale',
                body: 'Big winter sale in our shops around the' + utilService.makeLorem(30),
                isRead: true,
                isStarred: false,
                sentAt: 1740010979176,
                removedAt: null,
                from: 'batman@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1739643875124,
                subject: 'My invoice',
                body: 'Can I download my invoice from your site' + utilService.makeLorem(30),
                isRead: false,
                isStarred: true,
                sentAt: 1739644875124,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'another@momo.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1739923200000,
                subject: 'Hi Batman',
                body: 'Look at ou editors choice for this week' + utilService.makeLorem(30),
                isRead: true,
                isStarred: false,
                sentAt: 1739923260000,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'hulk@example.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1739664000000,
                subject: 'Event Invitation',
                body: 'Join us for the February celebration.' + utilService.makeLorem(30),
                isRead: false,
                isStarred: false,
                sentAt: 1739664060000,
                removedAt: null,
                from: 'event@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1739644865124,
                subject: 'Hi there',
                body: 'Can I ask you something' + utilService.makeLorem(30),
                isRead: true,
                isStarred: false,
                sentAt: null,
                removedAt: 1739694875124,
                from: 'user@appsus.com',
                to: 'momo@momo.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1739232000000,
                subject: 'Project Update',
                body: 'Here is the latest update on the project.' + utilService.makeLorem(30),
                isRead: true,
                isStarred: false,
                sentAt: 1739232060000,
                removedAt: null,
                from: 'batman@marvel.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1738531200000,
                subject: 'Miss you',
                body: 'Would love to catch up sometimes' + utilService.makeLorem(30),
                isRead: false,
                isStarred: true,
                sentAt: 1738531202000,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1738368000000,
                subject: 'MissBook Sale',
                body: 'Big winter sale in our shops around the' + utilService.makeLorem(30),
                isRead: false,
                isStarred: true,
                sentAt: 1738368060000,
                removedAt: null,
                from: 'ironman@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1738022400000,
                subject: 'Party Invitation',
                body: 'You are invited to our party!' + utilService.makeLorem(30),
                isRead: false,
                isStarred: false,
                sentAt: 1738022460000,
                removedAt: null,
                from: 'party@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1737763200000,
                subject: 'Invoice Details',
                body: 'Here is your invoces for last month' + utilService.makeLorem(30),
                isRead: true,
                isStarred: false,
                sentAt: 1737763260000,
                removedAt: null,
                from: 'flash@marvel.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1737331200000,
                subject: 'Meeting Reminder',
                body: 'Dont forget about our meeting this week' + utilService.makeLorem(30),
                isRead: true,
                isStarred: true,
                sentAt: 1737331260000,
                removedAt: null,
                from: 'john@work.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1736640000000,
                subject: 'January Update',
                body: 'Here is the update for January around the' + utilService.makeLorem(30),
                isRead: true,
                isStarred: true,
                sentAt: 1736640060000,
                removedAt: null,
                from: 'newsletter@example.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1620268800000,
                subject: 'Follow Up',
                body: 'Big winter sale in our shops around the' + utilService.makeLorem(30),
                isRead: true,
                isStarred: false,
                sentAt: 1620010969176,
                removedAt: null,
                from: 'batman@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1551133830500,
                subject: 'Order sent',
                body: 'Your odrer is on way to your' + utilService.makeLorem(30),
                isRead: true,
                isStarred: false,
                sentAt: 1556133940594,
                removedAt: 1558138940594,
                from: 'wolverine@momo.com',
                to: 'user@appsus.com'
            },

        ]
    }
    utilService.saveToStorage(MAIL_KEY, mails)
    console.log(mails)
}