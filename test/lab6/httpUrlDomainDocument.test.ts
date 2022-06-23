import {describe} from 'mocha'
import {expect} from 'chai'
import {HttpDomainDocument} from '../../src/lab6/HttpDomainDocument'
import {Protocol} from '../../src/lab6/HttpUrl'

describe('HttpDomainDocument', () => {
    let httpDomainDocument: HttpDomainDocument

    it('original http url should be returned', () => {
        httpDomainDocument = new HttpDomainDocument('www.ispring.ru', '/', Protocol.HTTP)
        expect(httpDomainDocument.getUrl()).eql('http://www.ispring.ru/')
    })

    it('original https url should be returned', () => {
        httpDomainDocument = new HttpDomainDocument('www.ispring.ru', '/', Protocol.HTTPS)
        expect(httpDomainDocument.getUrl()).eql('https://www.ispring.ru/')
    })

    it('without protocol original http url should be returned', () => {
        httpDomainDocument = new HttpDomainDocument('www.ispring.ru', '/')
        expect(httpDomainDocument.getUrl()).eql('http://www.ispring.ru/')
    })

    it('empty document should replace on /', () => {
        httpDomainDocument = new HttpDomainDocument('www.ispring.ru', '', Protocol.HTTPS)
        expect(httpDomainDocument.getUrl()).eql('https://www.ispring.ru/')
    })

    it('empty domain should return exception', () => {
        try {
            httpDomainDocument = new HttpDomainDocument('', '', Protocol.HTTPS)
            expect(httpDomainDocument.getUrl()).not.eql('https:///')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })
})