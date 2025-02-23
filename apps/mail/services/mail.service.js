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
    save
}

function query(filterBy) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            mails = filter(mails, filterBy)
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
        isRead: null,
        isStared: null,
        labels: []
    }
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
    return mails
}

function _createDemoMails() {

    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: utilService.makeId(),
                createdAt: 1551133930500,
                subject: 'Miss you',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1739644865124,
                subject: 'Hi there',
                body: 'Can I ask you something',
                isRead: true,
                sentAt: 1739644875124,
                removedAt: 1739694875124,
                from: 'user@appsus.com',
                to: 'momo@momo.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1739643875124,
                subject: 'Your invoice',
                body: 'You can download your invoice from our site',
                isRead: false,
                sentAt: 1739644875124,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'another@momo.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1740020949176,
                subject: 'Please call me',
                body: 'Tried to call you and you didnt',
                isRead: false,
                sentAt: null,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'someone@momo.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1551133830500,
                subject: 'Order sent',
                body: 'Your odrer is on way to your',
                isRead: true,
                sentAt: 1551133940594,
                removedAt: 1551138940594,
                from: 'wolverine@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                createdAt: 1740010949176,
                subject: 'Miss you',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1740010969176,
                removedAt: null,
                from: 'batman@momo.com',
                to: 'user@appsus.com'
            }
        ]
    }
    utilService.saveToStorage(MAIL_KEY, mails)
    console.log(mails)
}