import {describe} from 'mocha'
import {expect} from 'chai'
import {HttpDomainPortDocument} from '../../src/lab6/HttpDomainPortDocument'
import {Protocol} from '../../src/lab6/HttpUrl'

describe('HttpDomainPortDocument', () => {
    let httpDomainPortDocument: HttpDomainPortDocument

    it('original http url should be returned without default port', () => {
        httpDomainPortDocument = new HttpDomainPortDocument('www.ispring.ru', '/', Protocol.HTTP, 80)
        expect(httpDomainPortDocument.getUrl()).eql('http://www.ispring.ru/')
    })

    it('original https url should be returned without default port', () => {
        httpDomainPortDocument = new HttpDomainPortDocument('www.ispring.ru', '/', Protocol.HTTPS, 443)
        expect(httpDomainPortDocument.getUrl()).eql('https://www.ispring.ru/')
    })

    it('original http url should be returned', () => {
        httpDomainPortDocument = new HttpDomainPortDocument('www.ispring.ru', '/', Protocol.HTTP, 8080)
        expect(httpDomainPortDocument.getUrl()).eql('http://www.ispring.ru:8080/')
    })

    it('empty document should replace on /', () => {
        httpDomainPortDocument = new HttpDomainPortDocument('www.ispring.ru', '', Protocol.HTTPS, 443)
        expect(httpDomainPortDocument.getUrl()).eql('https://www.ispring.ru/')
    })

    it('empty domain should return exception', () => {
        try {
            httpDomainPortDocument = new HttpDomainPortDocument('', '', Protocol.HTTPS, 443)
            expect(httpDomainPortDocument.getUrl()).not.eql('https:///')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('negative port number should return exception', () => {
        try {
            httpDomainPortDocument = new HttpDomainPortDocument('www.ispring.ru', '', Protocol.HTTPS, -1)
            expect(httpDomainPortDocument.getUrl()).not.eql('https://www.ispring.ru:-1/')
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })

    it('float port number should return exception', () => {
        try {
            httpDomainPortDocument = new HttpDomainPortDocument('www.ispring.ru', '', Protocol.HTTPS, 80.5)
            expect(httpDomainPortDocument.getUrl()).not.eql('https://www.ispring.ru:80.5/')
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })

    it('too large port number should return exception', () => {
        try {
            httpDomainPortDocument = new HttpDomainPortDocument('www.ispring.ru', '', Protocol.HTTPS, 65536)
            expect(httpDomainPortDocument.getUrl()).not.eql('https://www.ispring.ru:65536/')
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })

    it('0 port number should return exception', () => {
        try {
            httpDomainPortDocument = new HttpDomainPortDocument('www.ispring.ru', '', Protocol.HTTPS, 0)
            expect(httpDomainPortDocument.getUrl()).not.eql('https://www.ispring.ru:0/')
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })

    it('65535 is correct port number', () => {
        httpDomainPortDocument = new HttpDomainPortDocument('www.ispring.ru', '', Protocol.HTTPS, 65535)
        expect(httpDomainPortDocument.getUrl()).eql('https://www.ispring.ru:65535/')
    })
})